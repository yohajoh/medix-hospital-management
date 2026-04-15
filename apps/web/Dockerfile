
# Start in dev mode for hot-reloading
# CMD ["pnpm", "--filter", "web", "dev"]

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

# BUILD STEP: This generates the .next folder required for production
RUN pnpm turbo run build --filter=web

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app .

EXPOSE 3000

# Next.js production start command
# -p 3000 ensures it matches EXPOSE
# -H 0.0.0.0 is MANDATORY for Render to see the app
CMD ["pnpm", "--filter", "web", "start", "--", "-p", "3000", "-H", "0.0.0.0"]