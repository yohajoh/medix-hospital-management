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

# Copy pruned workspace metadata
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies (Including devDeps for hot-reloading)
RUN pnpm install --frozen-lockfile

# Copy the actual source code
COPY --from=builder /app/out/full/ .

# REDUNDANT BUILD STEP REMOVED: 
# We don't run 'pnpm build' here because we are using 'next dev' in the runner.

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=development

# Setup user and permissions
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Prepare cache directory with correct permissions
RUN mkdir -p apps/web/.next && chown -R nextjs:nodejs /app

USER nextjs

# Copy all files from installer
COPY --from=installer --chown=nextjs:nodejs /app .

EXPOSE 3000

# Start in dev mode for hot-reloading
CMD ["pnpm", "--filter", "web", "dev"]