FROM node:14.15-alpine

WORKDIR /app

COPY package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

EXPOSE 3000
CMD ["node", "./src/server.js"]