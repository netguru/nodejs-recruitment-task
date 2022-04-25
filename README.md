# Node.js recruitment task

## Project: RESTFUL MOVIE API
 ![javascript](https://img.shields.io/badge/%20%20JavaScript-%20%20%20%20730L-f1e05a.svg) ![docker](https://img.shields.io/badge/%20%20DOCKER-%20%20%20%20164L-e34c26.svg)           ![javascript](https://badges.aleen42.com/src/javascript.svg) ![npm](https://badges.aleen42.com/src/npm.svg)
  ![node](https://badges.aleen42.com/src/node.svg) ![github](https://badges.aleen42.com/src/github.svg)  ![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Mac OS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0)  ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)  ![Trueosiris Rules](https://img.shields.io/badge/trueosiris-rules-f08060) [![Docker Pulls](https://badgen.net/docker/pulls/trueosiris/godaddypy?icon=docker&label=pulls)](https://hub.docker.com/r/trueosiris/godaddypy/) [![Docker Stars](https://badgen.net/docker/stars/trueosiris/godaddypy?icon=docker&label=stars)](https://hub.docker.com/r/trueosiris/godaddypy/)  [![Docker Image Size](https://badgen.net/docker/size/trueosiris/godaddypy?icon=docker&label=image%20size)](https://hub.docker.com/r/trueosiris/godaddypy/)  ![Github stars](https://badgen.net/github/stars/trueosiris/docker-godaddypy?icon=github&label=stars) ![Github forks](https://badgen.net/github/forks/trueosiris/docker-godaddypy?icon=github&label=forks) ![Github issues](https://img.shields.io/github/issues/TrueOsiris/docker-godaddypy)  ![Github last-commit](https://img.shields.io/github/last-commit/TrueOsiris/docker-godaddypy)

#### Project Can be found in here :
 **[Live version](http://localhost:3000)**

<br/>
<p align="center">
	
<img src="https://user-images.githubusercontent.com/57604500/165084736-8e6424e8-d986-4a14-a448-be0897877b64.png" width=656>
<br />
<h3 align="center">👨🏻‍💻 RestFul Movie API Backend</h3>
</p>

### Project Description

This project aims to use RestFul Back end Nodejs and Express.js framework where it is a back-end frameworks to fit a differential equation to the Movie API APPLICATION with users movie data. This would allow us to create movies for our users and our user also can able to see all movies lists. This would be to authenticate securely and done separately for basic and premium users usage rate limitation per day or per month. The results would be displayed on http://localhost:3000. It has a movie list.

### Technologies Used 🖥
#### Backend development:

 * Backend Framework: Node JS
 * Mongoose
 * PostMan API
 * Database: MongoDB
 * Server side: Express JS
 * Connect to MongoDB use Mongoose
 * Production: Docker and Docker-Compose

### Features 📞

 * Movie API App 📞 My Project Setup
 * Movie API App 📞 Setting up VSCode and Docker Desktop Environment
 * Movie API App 📞 Working On GET Method
 * Movie API App 📞 Setting Up Authentication 
 * Movie API App 📞  Working On POST RESPONSE
 * Movie API App 📞 Setting Up The Back-End
 * Movie API App 📞 Setting Up MongoDB
 * Movie API App 📞 Connecting Front-End and Back-End

## 🖥 ENVIRONMENT

| No. | Software                  | Version | Reason                |
| --- | ------------------------- | ------- | --------------------- |
| 1.  | Docker Desktop       |  4.7.0 (77141)   | Web Application Production    |
| 2.  | Visual Studio Code        | 1.55.2  | My Personal Choice    |
| 3.  | Express                     | 4.17.1  | To run side server|
| 4.  | Node                      | 1.0.0 | To run backend server |
| 5.  | MongoDB Server            | 4.2     | To run mongoDB server |
| 6.  | Desktop Web Application| Any Version Supported | Default on Windows or MacOS and its not mobile-friendly |
| 7.  | PostMan API            | 9.15.11       | To use API Requests |
| 8.  | CircleCI               |  2.1          | To see CI/CD Pipelines |


### Build a Simple Movie API. It should provide two endpoints:

#### Methods:

1. `POST /movies`
   1. It would allows users to create a by using any title fo the movie.
   2. After using title the movie can able to fetch that matched movie from OMDb API but if it not get from API it would create a new movie and added into API and saved all movies into MongoDB Database. By posting request into `POSTMAN API` or `Download VS-Code REST Client Extension` and Go to this url:  `http://localhost:3000/movies`
  ```
  {
    "title" : "Batman",
    "released": "23 Jun 1989",
    "genre": "Action, Adventure",
    "director": "Tim Burton"
  }
  ```
   3. If you want to create movie please `Register` because we use Authentication to secure our users data. Check this by posting request: `http://localhost:3000/auth/register`.
  
  For example:
   ```
  {
    "id": 123,
    "role": "basic",
    "name": "Basic Thomas",
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
  }
  ```
   4. Then Please Log In to create your own movie by posting request `http://localhost:3000/auth/login`. For example,

   ```
  {
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
  }

   ```

   5. `Basic` users has restriction to create 5 movies per day or month because their is rate limiation. `Premium` users have no limits.


1. `GET /movies`
   1. This is secure for users so you need to authenticate to see a list of all movies that the users created and you need to register and then login. Please while sending request you will get a Authorization Token and if you are using PostMan API then use it before Log In .

```
Authorization: Bearer <token>
```

Moreover, `Postman API` when the user logged in with the token the user can post in the url `http://localhost:3000/auth/movies`.
# Authorization service

Also use JWT token to authorize as a users and it is located in `.env` file in the project directory. 

## Prerequisites

Please Download and Install the `docker` and `docker-compose` installed on your computer to run the service. I have always use Docker Desktop while running my container and images.
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
### Docker usage:

Please run this command to build the container in our project: 

```
  docker build 
```

Then run this command to see all docker images :

```
  docker ps -a
```
Or, 

```
  docker ps --all
```

To run the container Please run this command :

```
  docker-compose up

```

Last but not least please press `Control + C` to stop the container in the terminal.

## JWT Secret

To generate tokens in auth service you need to check env file variable
`JWT_SECRET`. It should be a string value. You should use the same secret in
the API we had build to verify the JWT tokens.

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
user, including its role.

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

## The Project API Information:

- Database and framework: Nodejs and Express.js.
- API has been to be dockerized. Please check my logic into `Dockerfile` and `docker-compose` and document the process of running it locally.
- This API has two microservices.
  - `Authentication Service` - provided by us to auth users
  - `Movies Service` - created by you to handle movies data
- Test my code using Jest for Unit Testing.
- Read the README file where I had explain about the project setup.
- I had push my work into CircleCI and created a sample CI/CD Pipelines to run the tests. For example
