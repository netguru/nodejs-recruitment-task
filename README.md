# Node.js recruitment task

We'd like you to build a simple Movie API. It should provide two endpoints:

1. `POST /movies`
   1. Allows creating a movie object based on movie title passed in the request body
   2. Bade on title additional movie details should be fetched from
      https://omdbapi.com/ and saved to the database. Data we would like you to
      fetch from OMDb API:
   ```
     Title: string
     Released: date
     Genre: string
     Director: string
   ```
   3. Only authorized users can create a movie.
   4. `Basic` users are restricted to create a 5 movies per month (calendar
      month). `Premium` users have no limits.
1. `GET /movies`
   1. Should fetch a list of all movies created by an authorized user.

⚠️ Don't forget to verify user's authorization token before processing the
request. The token should be passed in request's `Authorization` header.

```
Authorization: Bearer <token>
```

# Authorization service

To authorize users please use our simple auth service based on JWT tokens.
Auth service code is located under `./src` directory

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally

1. Clone this repository
1. Run from root dir

```
JWT_SECRET=secret docker-compose up -d
```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```

## JWT Secret

To generate tokens in auth service you need to provide env variable
`JWT_SECRET`. It should be a string value. You should use the same secret in
the API you're building to verify the JWT tokens.

## Users

The auth service defines two user accounts that you should use

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Token payload

Decoding the auth token will give you access to basic information about the
user including its role.

```
{
  "userId": 123,
  "name": "Basic Thomas",
  "role": "basic",
  "iat": 1606221838,
  "exp": 1606223638,
  "iss": "https://www.netguru.com/",
  "sub": "123"
}
```

## Example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

## Rules

- Database and framework choice are on your side.
- Your API has to be dockerized. Create `Dockerfile` and `docker-compose` and document the process of running it locally.
- Provided solution should consist of two microservices.
  - `Authentication Service` - provided by us to auth users
  - `Movies Service` - created by you to handle movies data
- Test your code.
- Provide documentation of your API.
- Application should be pushed to the public git repository and should have a
  working CI/CD pipeline that runs the tests. For example you can use GitHub
  Actions or CircleCI. Create a sample PR to show us the working CI/CD pipeline.

## What will be evaluated?

- Task completeness
- Architecture
- Code quality
- Tests quality
- Database design
- Technology stack

-----

# Documentation

Documentation is provided by Swagger on `/api-docs` on `movies` container.

# Instructions

There are no `Dockerfile` files, everything Docker related is configured inside `docker-compose.yml`. Thanks to that there is no need for building containers.

## Run containers

To start containers in production mode run:
```
NODE_ENV=prod docker-compose up -d
```

To start containers in development mode run:
```
NODE_ENV=dev docker-compose up -d
```
`JWT_SECRET` as well as other confidential data is stored in `.env` file, which is available to all services and for convenience is included in the repository.

To stop all containers you can run:
```
docker-compose down
```

or, if you don't want to delete them:
```
docker stop $(docker ps -aq -f name=netguru)
```

and then you can later start them by:
```
docker start $(docker ps -aq -f name=netguru)
```
You can change `name` property from `netguru` to `netguru-prod` or `netguru-dev` appropriately.

## Run tests

You can run test locally if you have installed locally `node` and `npm`.
Then go to main project directory and install dependencies:
```
npm i
```

To run `authentication` service tests run:
```
npm run test:authentication
```

To run `movies` service tests run:
```
npm run test:movies
```

To run all tests run:
```
npm run test
```

This way of executing tests (instead of inside of docker containers) was choosen for easier access to run tests separately for each service.

# Tools used

- Linux OS
- VSCode
- Docker
- TypeScript
- Express
- PostgreSQL
- PGAdmin
- TypeORM
- PG
- Express-Async-Errors
- JsonWebToken
- Nodemon
- TS-Node
- DotEnv
- Jest
- Axios
- RimRaf
- ESLint
- Prettier
- Airbnb-Base-Ts
- Husky
- REST Client for VSCode
- PostMan
- Swagger
