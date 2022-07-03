#!/bin/bash
set -eo pipefail
shopt -s nullglob

echo "NODE_ENV: ${NODE_ENV}"

yarn install --check-files

yarn lint
yarn prettier
yarn test
