FROM node:17.9.0-buster-slim

WORKDIR /app

COPY ./package.json .

COPY ./yarn.lock .

RUN yarn

COPY . .

RUN yarn build

# database schema migration is done here because we are using SQLite (no volume mapping and local to container)
# ideally, it should be done outside of the container by the developer
# to prevent possible data loss in production env
RUN yarn typeorm:cli schema:sync

EXPOSE 4000

CMD ["yarn", "start"]