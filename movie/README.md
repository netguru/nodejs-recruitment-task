# Movie Service

## Tech Stack

List of technologies to create the movie api

**Server:** [Node](https://nodejs.org/en/), [Express](https://expressjs.com/)

**Database:** [MongoDB](https://docs.mongodb.com/), [Mongoose](https://mongoosejs.com/)

**Test:** [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)






## API Reference

### Get all movies
```http
  GET /movies
```

#### Request

    curl --location --request POST 'http://localhost:4000/movies' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>'

#### Response

    {
        "success": true,
        "data": [
            {
                "_id": "62361a4c53f1a4c3195fbb0a",
                "title": "The Batman",
                "releasedDate": "2022-03-04T00:00:00.000Z",
                "genre": "Action, Crime, Drama",
                "director": "Matt Reeves",
                "creator": 123,
                "createdAt": "2022-03-19T18:00:44.170Z"
            }
        ]
    }


### Create new movie

```http
  POST /movies
```
    curl --location --request POST 'http://localhost:4000/movies' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data-raw '{
        "title": "The Batman"
    }'

#### Response

    {
        "success": true,
        "data": [
            {
                "_id": "62361a4c53f1a4c3195fbb0a",
                "title": "The Batman",
                "releasedDate": "2022-03-04T00:00:00.000Z",
                "genre": "Action, Crime, Drama",
                "director": "Matt Reeves",
                "creator": 123,
                "createdAt": "2022-03-19T18:00:44.170Z"
            }
        ]
    }
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

Dockerize the movie api and run it in the background

```bash
$ docker-compose up -d
```

Stop the movie api

```bash
$ docker-compose down
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`, `PORT`, `DATABASE_URI`, `DB_NAME`, `OMDB_API_KEY`

#### JWT Secret

To generate tokens in auth service you need to provide env variable
`JWT_SECRET`. It should be a string value. You should use the same secret in
the API you're building to verify the JWT tokens.

#### PORT

Default `PORT` for Movie Service is 4000.

#### DATABASE_URI

The URI that lets you connect to a MongoDB service either in your local machine or 
in the cloud

#### DB_NAME

Database name that is created when you connect to MongoDB and where the movie collection resides. 
Default `DB_NAME` is `register_movie`. 

#### DB_NAME

Database name that is created when you connect to MongoDB. 
Default `DB_NAME` is `register_movie`. 

#### OMDB_API_KEY

`OMDb API The Open Movie Database` is a free API where you can search for 
movie information. To be able to pull data from there database, you need an 
API Key that authorized you to get a movie data in there platform.
You can create your own API Key in [here](https://omdbapi.com/apikey.aspx).

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

