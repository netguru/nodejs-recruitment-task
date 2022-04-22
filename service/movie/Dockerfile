FROM node:14.15-alpine
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production --no-optional; \
    fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "bin/server.js"]
