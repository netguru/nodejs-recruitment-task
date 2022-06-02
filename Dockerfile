# Base
FROM node:14-alpine AS base

ARG NPM_TOKEN

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src src
COPY prisma prisma
COPY tsconfig*.json ./

RUN npm run build

# Production
FROM node:14-alpine AS production

ARG NODE_ENV

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/package*.json ./

RUN npm install -g prisma
RUN npm install --only=production

COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/prisma ./prisma

RUN echo $NODE_ENV

CMD npm run start
