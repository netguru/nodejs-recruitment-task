# Movie service


## Run locally

1. Clone this repository
1. Run from root dir


By default the auth service will start on port `3003`. You can run the application using docker. 

```
docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```

## API Endpoint Request/Response
To authorize user call the movie service using for example `curl`. We assume
that the movie service is running of the default port `3003`.


#### Create movie
Request

```
curl --location --request POST '0.0.0.0:3003/movies' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "titanic",
}'
```

Response

```
{
    "id": 17,
    "userId": 123,
    "title": "Titanic",
    "released": "1997-12-18T18:00:00.000Z",
    "genre": "Drama, Romance",
    "director": "James Cameron",
    "updatedAt": "2022-03-17T15:53:44.759Z",
    "createdAt": "2022-03-17T15:53:44.759Z"
}
```

#### Fetch movie
Request

```
curl --location --request GET '0.0.0.0:3003/movies' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "titanic",
}'
```

Response

```
[
    {
        "id": 17,
        "title": "Titanic",
        "released": "1997-12-18T18:00:00.000Z",
        "genre": "Drama, Romance",
        "director": "James Cameron",
        "userId": 123,
        "createdAt": "2022-03-17T15:53:44.759Z",
        "updatedAt": "2022-03-17T15:53:44.759Z"
    }
]
```
