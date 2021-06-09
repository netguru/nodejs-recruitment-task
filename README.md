# Movies and Auth microservices

A collection of small `node` based services that allow the user to fetch and add movies with movie details from the [OMDB api](https://omdbapi.com/). A description of the original assignment is [here](assignment/README.md).
There are two services:

- `auth` authorizes users and provides them with a `JWT` token
- `movies` allows users to add movies based on a title and to subsequently fetch them

**Note:**
This project is still (as of 09-06-2021) under development and is missing:
- Unit tests
- CI/CD

## 1. `auth` service

The `auth` service allows for two types of users:
- `basic` can fetch movie list unlimited times, but can only insert **five** movies per month
- `premium` can fetch movie list unlimited times and can insert **unlimited** movies per month

You can find the source code for the service in [auth](auth/src)

#### How to start the `auth` service

The service is dockerized. 
Make sure to have `docker` and `docker-compose` installed. Check out this repository, then navigate to the `auth` directory and run:

```bash
sudo JWT_SECRET=secret docker-compose up -d --build 
```

Where you need to specify the same `JWT_SECRET` variable value as the one you use to run the `movies` service.

#### Testing whether the `auth` service is up

With a tool like `postman` or `curl`, make a request to `localhost:3000`

For example:

- Basic user
```bash
curl --location --request POST 'localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
``` 

- Premium user:
```bash
curl --location --request POST 'localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "premium-jim",
    "password": "GBLtTyq3E_UNjFnpo9m6"
}'
```

## 2. `movies` service

The `movies` service takes a token that one can obtain from the `auth` service, and allows the user to add movies and get the results back. Movie adding requires only a title, but the added movie is enriched with details from the [OMDB api](https://omdbapi.com/). 

- Only authorized users can either add or fetch movies.
- `basic` users can add only 5 movies per month but can fetch unlimited times
- `premium` users can add unlimited number of movies and can also fetch movies unlimited times

#### How to start the `movies` service

The service is dockerized. It contains an `express` server and a `postgres` database.
- Make sure to have `docker` and `docker-compose` installed. 
- Obtain a free api key from the OMDB API.
- Check out this repository, then navigate to the `movies` directory and run:

```bash
sudo POSTGRES_PASSWORD=postgrespassword JWT_SECRET=secret OMDB_API_KEY=omdbapikey docker-compose up --build -d
```

Where:
- `POSTGRES_PASSWORD` is the password with which the `postgres` container will be started.
- `JWT_SECRET` needs to be the same as the one specified to the `auth` service
- `OMDB_API_KEY` is the value of the api key obtained from the OMDB API


#### Testing whether the `movies` service is up

With a tool like `postman` or `curl`, make a request to `localhost:3001/movies`.

The service exposes two endpoints:

- `GET/movies`
- `POST/movies`

For example, this is how you can list all the currently added movies:

```bash
curl --location --request GET 'localhost:3001/movies' \
--header 'Authorization: Bearer <auth_token>'
```

And this is how you can add "Happy Feet" to the collection of movies:

```bash
curl --location --request POST 'localhost:3001/movies' \
--header 'Authorization: Bearer <auth_token>' \
--header 'Content-Type: application/json' \
--data-raw '{
   "title": "happy feet"
}'
```