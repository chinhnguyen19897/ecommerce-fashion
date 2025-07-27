# --- Build stage ---
FROM node:24.0.0-alpine as build

WORKDIR /app

RUN corepack enable
RUN apk update && apk add --no-cache openssl

COPY package*.json ./
RUN yarn install
COPY . .
RUN npx prisma generate

RUN yarn build

##Build stage 2
FROM node:24.0.0-alpine as prod

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

