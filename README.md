# Node.js recruitment task - solved

## Version by Adrian Chlubek

## How to run it
1. Clone the repository
2. Create .env file based on what you want, copying .env.test to .env and modifying it will do fine
3. Run `make build` to build necessary images
4. Run the dev stack using `make dev.up`

## API docs
Once the stack is running, auto-generated openapi documentation can be found on address `http://localhost:3001/docs`

## Tech used
- `docker compose` instead of `docker-compose`
- PostgreSQL as database
- TypeORM as ORM (I also like Prisma but choose this here due to Nest compatibility)
- NestJS 8
- Mocha/Chai for testing purposes
- CircleCI for pipelines

## Trivia

- I didn't touch auth-service much to preserve it's original form
- The code that was used to bootstrap the movies-service part is my own bootstrap that I created over several years of experience
- .env file is not required for the service itself, as the code reads from process.env and doesn't use devenv, so this can be deployed in many various places without issues
