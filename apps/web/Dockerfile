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
RUN pnpm turbo run build --filter=web

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Render uses a dynamic port, but we'll default to 3000
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# We copy the entire app, but focus on the web package
COPY --from=installer --chown=nextjs:nodejs /app .

USER nextjs

EXPOSE 3000

# DIRECT EXECUTION: This is the secret to stability.
# We go straight to the next binary inside the web package.
CMD ["node", "apps/web/node_modules/.bin/next", "start", "apps/web", "-p", "3000", "-H", "0.0.0.0"]