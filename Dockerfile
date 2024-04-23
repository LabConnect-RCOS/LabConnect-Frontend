FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY build /app/build
RUN npm install -g serve


EXPOSE 3000

CMD ["serve", "-s", "build"]