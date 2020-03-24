## Requirements

- `node 12.14.1`
- `yarn 1.21.1`

## Setup

1. prepare env file - `cp .env.example .env`
1. add required env vars to `.env` file
1. install dependencies - `yarn`
1. start server - `yarn start:dev`

If app is setup correctly then running `curl -v 127.0.0.1:3000/health` will
return `200 OK` with empty body. Assuming default port is used. Every other
route will return `404`

## Env vars

Required by app:

- `APP_PORT` application port; default to `3000`

Required by seeding script:

- `MONGO_DB_URL` mongo db connection string; required for seeding db with users data

## Seeding database

Seeds are located in `data/users.json`. You can load them to mongo db using
`script/loadSeeds.js` script or by running `yarn db:seed`. Don't forget to
setup `MONGO_DB_URL` env var

## Log file

Sample log file is located in `data/events.log`
