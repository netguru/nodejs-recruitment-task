#!/bin/sh
set -e

waitfor tcp://${DB_HOST}:${DB_PORT}

echo "NODE_ENV: ${NODE_ENV}"

if [[ "${NODE_ENV}" != "production" ]]
    then yarn install
fi

typeorm migration:run

exec "$@"
