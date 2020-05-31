## Tasks

## Requirements

Please use:

- `node` (can be LTS of current)
- `yarn`
- `jest`

## Seeding database

Seeds are located in `data/users.json`. The format is tightly coupled with mongodb, but feel fre to adjust it and use it in the DB of your choice.

## Log file

Sample log file is located in `data/events.log`


### Task I
Your task is to create a micro service application that will allow authorized requests to read logs processed by the application server.

Additional information:
* The credentials are in the users.json file in the data folder in this repository
* For the purposes of the application, we use the generated events.log file with samples located in the data folder in this repository. The structure of the logs looks like this:

example log entry:

| timestamp | UUIDv4 | type | message |
|---|---|---|---|
| 1584969745903 | eab576a7-ea7f-4ce1-acfb-4e97d3a4a5bb | warn | AccessDenied: You are not authorize |

Implement the following requests:

1. The ability to download the entire list of logs or specific range from/to based on timestamp
```
Request:
  Header:
  authorization-token: String (UUIDv4)
  GET /public/logs?from=...&to=...
Response:
  [
    {
      uuid:    String (UUIDv4)
      time:    String (format ISO)
      type:    String (info|warn|error)
      message: String
    }
  ]
  Status: 200
```
2. The possibility to find a specific entry with a given UUID
```

Request:
  Header:
  authorization-token: String (UUIDv4)
  GET /public/logs/:uuid
Response:
  {
    time:    String (format ISO)
    type:    String (info|warn|error)
    message: String
  }
  Status: 200
```
3. The ability for admin user to create a new one (non-admin) with a list of permissions (only read and create permissions should be possible)
```
Request:
  Header:
  authorization-token: String (UUIDv4)
  POST /internal/users
  Body:
  {
    username:    String
    permissions: [String] (read|create)
  }
Response:
  {
    username:    String
    token:       String   (UUIDv4)
    permissions: [String] (read|create)
  }
  Status: 201
```

#### Mandatory requirement is to publish the application on AWS. Please use your own account and services with free tiers.

There will be evaluated whether:
* your solution realizes task assumptions
* your code is consistent or using a linter
* app is covered to the point we may assume you know how to write specs
* you avoid a procedural code
* requests are properly handled
* git log structure is consistent
* project structure is well thought out
* exceptions are properly handled
* inputs are validated

You may also gain extra points if your solution will be somehow extraordinary and will use best practices

### Task II

The management decided to dockerize the application. Your task is to prepare the application from task #1 so that it works in development environment in the Docker container.

We want to be able to change the database connection string depending on the environment (development/test)

The result should be a script that will allow:
* run a working application server in the container
* run application tests in the container

e.g. with the help of docker-compose

There will be evaluated whether:
* your solution realizes task assumptions
* npm modules are cached properly during docker image building
* environment variables are passed correctly

You may also gain extra points if your solution will be somehow extraordinary and will use best practices
