FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@9.0.0

FROM base AS builder
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

# --- ADDED SECTION START ---
# Declare the argument (Render will pass this if you set it in Env vars)
ARG NEXT_PUBLIC_API_URL
# Set the environment variable for the build process
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# --- ADDED SECTION END ---

RUN pnpm turbo run build --filter=web

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Force Next.js to listen on all interfaces
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=installer --chown=nextjs:nodejs /app .

USER nextjs

EXPOSE 3000

# We use the full path to the web folder and let the shell execute the binary
# This avoids the SyntaxError because it won't force Node to parse a shell script
WORKDIR /app/apps/web
CMD ["node_modules/.bin/next", "start", "-p", "3000", "-H", "0.0.0.0"]