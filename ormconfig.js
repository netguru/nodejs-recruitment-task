const path = require('path');

module.exports = {
  type: 'sqlite',
  database: './netguru.db',
  logging: false,
  entities: [path.join(__dirname, './dist/models/*.js')],
  migrations: [path.join(__dirname, './dist/migrations/*.js')],
};
