<h1 align='center'>
    Netguru Movie Service 
</h1>

## Description
A node.js based simple Movie API service which will store you favorite movie list. You can find any movie by the movie title and it store the movie with minimul infomation like title, released date, genre and director name. 

## Technology Stack
- Node.js - Backend script.
- Express.js - Node.js framework.
- MongoDB - NoSQL databases.
- Mongoose - mongoDB ORM.
- Jest - JavaScript testing framework.
- Super Test - API testing framework.
- MongoDB Memory Server - Store data in memory for mocking the database.
- Nginx - API gateway.
- Docker - Containerize the application.
- Docker-compose - Up and running the full applicatin stack together.
- GitHub Action - CI pipe line to test the code. 

Nginx works as a API gateway, So all reaquest come to the nginx and it will route the request to appropite endpoint. Like if user request for /auth it will redirect the request to auth service.

## Run Project Locally
### Prerequisites

You need to have `docker`, `docker-compose` and `Node.js (16 LTS)` installed on your computer to run the service

### Steps

1. Clone this repository.
2. Go to the auth service in services directory and copy the `.sample.env` file, paste it in same directory as `.env`.
3. Set the `JWT_SECRET` key.
4. Node move to the movie service in services directory and copy the `.sample.env` file and paste it in same directory as `.env`.
5. Set the `OMDB_URL`, `OMDB_API_KEY` and `JWT_SECRET`. Important: set the same `JWT_SECRET` key as in the auth service.
6. Move to the root of the project directory and run `docker-compose build`
7. When the build is complete run `docker-compose up -d`.
8. By defaul server will run on [localhost:8888](http://localhost:8888).

## API Documentation


|    API   | Method | Descrition
|----------|--------|------------
| /auth    | POST   | create a auth token, if send a valid username and password.
| /movies  | GET    | response back list of all movies created by an authorized user 
| /movies  | POST   | creating a movie object based on movie title passed in the request body. Here is two type of user now is Basic and Premium. Basic user can create 5 movies per month and Premium user can create unlimited movies.


## Users

The auth service defines two user accounts that should use

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

2. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Request Response Example

To authorize user call use the following `curl`.

Request

```
curl --location --request POST '0.0.0.0:8888/auth' \
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

To create movie use the following `curl`

Request

```
curl --location --request POST '0.0.0.0:8888/movies' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <auth service token>' \
--data-raw '{
    "title": "Dune"
}'
```

Response

```
{
    "title": "Dune",
    "released": "14 Apr 2017",
    "genre": "Documentary",
    "director": "Cyril Dion, Mélanie Laurent"
},
```

To get movie list use the following `curl`

Request

```
curl --location '0.0.0.0:8888/movies' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <auth service token>'
```

Response

```
[
  {
      "title": "Tomorrow",
      "released": "14 Apr 2017",
      "genre": "Documentary",
      "director": "Cyril Dion, Mélanie Laurent"
  },
  {
      "title": "Today",
      "released": "14 Jan 1952",
      "genre": "News, Talk-Show",
      "director": "N/A"
  },
  {
      "title": "Kal Ho Naa Ho",
      "released": "28 Nov 2003",
      "genre": "Comedy, Drama, Musical",
      "director": "Nikkhil Advani"
  }
]
```