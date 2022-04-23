FROM node:14.15-alpine

RUN mkdir -p /src/app
WORKDIR /src/app/
COPY package.json /src/app/

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production --no-optional; \
    fi

COPY . /src/app

ENV PORT 8080
EXPOSE $PORT
CMD ["node", "bin/server.js"]

