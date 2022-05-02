# Node.js recruitment task

## Prerequisites

1. NodeJS 12.x, npm v8+
2. Docker

## Installation

1. Clone the repo
```bash
git clone {repo_url}
```

2. Build docker images
```bash
docker-compose build --no-cache
```

3. Start containers
```bash
docker-compose up -d
```

4. Create .env file in the services/movies directory based on the services/movies/environment/.env.local

5. Start server
```bash
npm run start:dev
```

6. Test the application
```bash
npm run test
```