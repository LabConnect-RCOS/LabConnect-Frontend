FROM --platform=linux/amd64 node:22-alpine3.20

WORKDIR /app

COPY build /app/build
RUN npm install -g serve

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

EXPOSE 3000

CMD ["serve", "-s", "build"]
