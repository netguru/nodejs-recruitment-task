FROM node:14.15-alpine

WORKDIR /app

COPY package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

EXPOSE 8080
#CMD ["node", "./src/index.js"]