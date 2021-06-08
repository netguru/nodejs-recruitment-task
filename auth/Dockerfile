FROM node:14.15-alpine
WORKDIR /node-auth-svc
COPY ./package*.json ./
RUN npm install
COPY ./src ./src
CMD ["node", "./src/server.js"]