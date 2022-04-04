# Movie Service

## Tech Stack

List of technologies to create the movie api

**Server:** [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [Mongoose](https://mongoosejs.com/)

**Database:** [MongoDB](https://docs.mongodb.com/)

**Test:** [mocha](https://www.chaijs.com/), [chai](https://www.chaijs.com/)

## API Reference

### Get all movies

```http
  GET /movies
```

#### Request

    curl --location --request GET 'http://localhost:8000/movies' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>'

#### Response

    {
        "status": true,
        "message": "Successfully fetched user movies",
        "data": [
            {
              "_id": "6248cd97c025561ae49373d6",
              "Title": "The Flash",
              "Released": "2014-10-06T23:00:00.000Z",
              "Genre": "Action, Adventure, Drama",
              "Director": "N/A",
              "user": 123,
              "createdAt": "2022-04-02T22:26:31.582Z"
          },
          {
              "_id": "6248ce65b973a06b374718ae",
              "Title": "Super Girl",
              "Released": "2011-11-18T23:00:00.000Z",
              "Genre": "Action, Comedy, Fantasy",
              "Director": "N/A",
              "user": 123,
              "createdAt": "2022-04-02T22:29:57.068Z"
          },
        ],
        "error": null
    }

### Create new movie

```http
  POST /movies
```

    curl --location --request POST 'http://localhost:8000/movies' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data-raw '{
        "title": "Amazing spider man"
    }'

#### Response

    "status": true,
    "message": "Successfully saved movie",
    "data": {
        "Title": "The Amazing Spider-Man",
        "Released": "2012-07-02T23:00:00.000Z",
        "Genre": "Action, Adventure, Sci-Fi",
        "Director": "Marc Webb",
        "user": 123,
        "_id": "624a4205094a659a4aeaf9f3",
        "createdAt": "2022-04-04T00:55:33.176Z",
        "__v": 0
    },
    "error": null

#### NOTE

- `Basic` users are restricted to create only 5 movies per month (calendar month).
- `Premium` users have no limits in creating movies.

## Run Locally

Clone the project

```bash
$ git clone <repository link>
```

Go to the movie directory

```bash
$ cd <project directory>/movie
```

Install dependencies

```bash
$ npm install
```

Start the server

```bash
$ npm run start
```

Dockerize the services and run it in the background

```bash
$ docker compose -f docker-compose.yml up -d
```

Stop the services

```bash
$ docker-compose down
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`JWT_SECRET`, `PORT`, `MONGO_URI`, `API_KEY`

#### JWT Secret

To generate tokens in auth service you need to provide env variable
`JWT_SECRET`. It should be a string value. You should use the same secret in
the API you're building to verify the JWT tokens.

#### PORT

Default `PORT` for Movie Service is 4000.

#### MONGO_URI

The URI that lets you connect to a MongoDB service either in your local machine.

#### API_KEY

`OMDb API The Open Movie Database` is a free API service where you can search for
movie information. To be able to pull data from their database, you need an
API Key that authorized you to get a movie data in their platform.
You can create your own API Key [here](https://omdbapi.com/apikey.aspx).

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## POSTMAN DOCS URL

https://documenter.getpostman.com/view/7357882/UVysxbdB

## Things i would have done differently if it were prod

- Put the env in secret rather then exposing them in the main.yml file
- covered more test
- uses a dynamic token in the test
