#!/bin/sh
set -e

echo "NODE_ENV: ${NODE_ENV}"

yarn install --check-files

yarn lint
yarn prettier
yarn test
