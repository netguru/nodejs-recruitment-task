# FROM node:14.15-alpine

# WORKDIR /app

# COPY ./package.json ./package-lock.json ./
# RUN npm install

# RUN mkdir ./src
# COPY ./src ./src

# CMD ["node", "./src/server.js"]

FROM node:14-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 4000

CMD [ "npm", "start" ]