FROM node:23-alpine3.21 AS base

# Install dependencies
FROM base AS deps

WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci

# Build the app with the node modules installed
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Create a new image with the build files
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/build ./build
RUN npm install -g serve

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://0.0.0.0:3000/health || exit 1

EXPOSE 3000

CMD ["serve", "-s", "build"]
