#!/bin/sh
set -e

echo "NODE_ENV: ${NODE_ENV}"

if [[ "${NODE_ENV}" != "production" ]]
    then npm install
fi

exec "$@"
