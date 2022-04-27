# Node.js recruitment task

# Technology stack

- Serverside: Node.js, express

- DB: mongoDb

- Containerization: docker

- CI/CD: Github actions

- Tests: jest, chai

# Api endpoints documentation:
https://anur13.github.io/nodejs-recruitment-task/

# Steps to run locally:
- Clone the repository
```
git clone <repo url>
```
- development build run
````
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up 
````
- add env variables to docker-compose.prod.yml 
- production build run 
````
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up 
````
- run tests for movie service
````
cd service/movie
npm run test
````
- shut down
````
docker-compose down
````

