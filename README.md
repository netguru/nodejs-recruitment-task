## Tasks

### Task I
Your task is to create a micro service application that will allow authorized requests to read logs processed by the application server.

Additional information:
* The credentials are in the users.json file in the data folder in this repository
* For the purposes of the application, we use the generated events.log file with samples located in the data folder in this repository. The structure of the logs looks like this:

example log entry:

| timestamp | UUIDv4 | type | message |
|---|---|---|---|
| 1584969745903 | eab576a7-ea7f-4ce1-acfb-4e97d3a4a5bb | warn | AccessDenied: You are not authorize |

Implement the following requests:

1. The ability to download the entire list of logs or specific range from/to based on timestamp
```
Request:
  Header:
  authorization-token: String (UUIDv4)
  GET /public/logs?from=...&to=...
Response:
  [
    {
      uuid:    String (UUIDv4)
      time:    String (format ISO)
      type:    String (info|warn|error)
      message: String
    }
  ]
  Status: 200
```
2. The possibility to find a specific entry with a given UUID
```

Request:
  Header:
  authorization-token: String (UUIDv4)
  GET /public/logs/:uuid
Response:
  {
    time:    String (format ISO)
    type:    String (info|warn|error)
    message: String
  }
  Status: 200
```
3. The ability for admin user to create a new one (non-admin) with a list of permissions (only read and create permissions should be possible)
```
Request:
  Header:
  authorization-token: String (UUIDv4)
  POST /internal/users
  Body:
  {
    username:    String
    permissions: [String] (read|create)
  }
Response:
  {
    username:    String
    token:       String   (UUIDv4)
    permissions: [String] (read|create)
  }
  Status: 201
```

#### Mandatory requirement is to publish the application on AWS. Please use your own account and services with free tiers.

There will be evaluated whether:
* your solution realizes task assumptions
* your code is consistent or using a linter
* app is covered to the point we may assume you know how to write specs
* you avoid a procedural code
* requests are properly handled
* git log structure is consistent
* project structure is well thought out
* exceptions are properly handled
* inputs are validated

You may also gain extra points if your solution will be somehow extraordinary and will use best practices

### Task II

The management decided to dockerize the application. Your task is to prepare the application from task #1 so that it works in development environment in the Docker container.

We want to be able to change the database connection string depending on the environment (development/test)

The result should be a script that will allow:
* run a working application server in the container
* run application tests in the container

e.g. with the help of docker-compose

There will be evaluated whether:
* your solution realizes task assumptions
* npm modules are cached properly during docker image building
* environment variables are passed correctly

You may also gain extra points if your solution will be somehow extraordinary and will use best practices

### Task III

The micro service from task #1 is planned to change the database to a more efficient one.
How would you refactor your application code so that you can implement the new database?

### Task IV

In last couple of months, the company has grown a lot and more and more websites often and eagerly use the logs of our micro site. Unfortunately the reading from the file is very slow. Provide a way that allows you to serve logs more efficiently.

## Skeleton requirements

Feel free to use skeleton from the repo but it is not obligatory. You may choose any framework or database up to your will. Have a fun and good luck!

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
