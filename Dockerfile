# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.20.2
FROM node:${NODE_VERSION}-slim as builder

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

COPY . .

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:${NODE_VERSION}-slim

WORKDIR /app

COPY --from=builder /app .

ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "yarn", "start" ]
