## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally

1. Clone this repository
2. copy content from ```movies-service/.env.example``` to ```movies-service/.env```
3. ensure that the value of JWT secret of auth and movie service are the same
4. Run from root dir

```
JWT_SECRET=secret docker-compose up -d
```

By default the auth service will start on port `3000` and movie service on port '4040'


To stop the authorization service run

```
docker-compose down
```
