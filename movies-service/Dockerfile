FROM node:16-slim AS packer

ENV DIR /var/www
WORKDIR $DIR

COPY app/package*.json app/yarn.* $DIR/
RUN yarn install && yarn link

COPY ./app $DIR

RUN yarn build

####

FROM node:16-alpine

ENV DIR /app
WORKDIR $DIR

ENV NODE_ENV production

# For Docker build cache
COPY app/package*.json app/yarn.* $DIR/
RUN yarn install --production && yarn link

COPY --from=packer /var/www/dist $DIR/dist
COPY app/ormconfig.js $DIR/

COPY docker/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "start:dist"]
EXPOSE 80

