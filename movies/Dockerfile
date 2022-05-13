FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

COPY .env ./

EXPOSE 3002

CMD ["npm", "start"]