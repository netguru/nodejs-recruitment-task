FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./src ./src
COPY tsconfig.json .
COPY globalConfig.json .
COPY jest.config.js .

#RUN npm run build
CMD ["npm", "run", "start"]