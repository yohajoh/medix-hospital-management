FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# 1. Install dependencies (including prisma)
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

# 2. GENERATE PRISMA CLIENT 
# We use 'pnpm dlx' to ensure the prisma CLI is available even if 
# it's not in the global path.
RUN pnpm --filter api exec npx prisma generate

# 3. Build the project
RUN pnpm turbo run build --filter=api

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer /app .

EXPOSE 5000

CMD ["pnpm", "--filter", "api", "start"]