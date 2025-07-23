
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN ls


RUN yarn build

EXPOSE 1337

ENTRYPOINT ["dumb-init", "yarn", "start"]
