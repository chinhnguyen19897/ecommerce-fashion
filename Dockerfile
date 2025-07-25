# --- Build stage ---
FROM --platform=linux/amd64 node:24-alpine

WORKDIR /app

RUN apk update && apk add --no-cache openssl

COPY package*.json ./
RUN yarn install
COPY . .
RUN npx prisma generate


EXPOSE 3000

CMD ["yarn", "dev"]

