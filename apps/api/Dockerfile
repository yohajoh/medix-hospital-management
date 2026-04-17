FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@9.0.0

FROM base AS builder
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS installer
WORKDIR /app

# Copy pruned workspace metadata
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the actual source code
COPY --from=builder /app/out/full/ .

# Inject required dependencies for Prisma 7
RUN pnpm --filter api add -D prisma @types/node
RUN pnpm --filter api add @prisma/client @prisma/adapter-pg dotenv

# GENERATE PRISMA CLIENT: 
# Path is relative to the 'api' package directory
RUN pnpm --filter api exec prisma generate --schema=prisma/schema.prisma

# Build the API
RUN pnpm turbo run build --filter=api

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer /app .

EXPOSE 5000

CMD ["pnpm", "--filter", "api", "start"]