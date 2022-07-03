FROM node:14.15-alpine

WORKDIR /app

COPY package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY src ./src

COPY docker/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "./src/server.js"]
