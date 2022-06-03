# Base
FROM node:14-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY src src
COPY prisma prisma
COPY tsconfig*.json ./

RUN npm run build

# Production
FROM node:14-alpine AS production

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/package*.json ./

RUN npm install -g prisma
RUN npm install --only=production
RUN npm install -g @nestjs/cli

COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/prisma ./prisma

RUN echo $NODE_ENV

CMD npm run start
