# Build stage
FROM node:22-alpine3.21 AS builder

WORKDIR /app

# Install libc6-compat if needed
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build the Vite app
COPY . .
RUN npm run build

# Final stage: nginx serving dist/
FROM nginx:stable-alpine as runner

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Vite files
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck for nginx
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://0.0.0.0/health || exit 1

# Expose port 80 (standard HTTP)
EXPOSE 80

# Start nginx automatically
CMD ["nginx", "-g", "daemon off;"]
