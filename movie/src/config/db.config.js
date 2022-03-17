const dbConfig = {
    development: {
      HOST: process.env.HOST,
      USER: process.env.USER,
      PASSWORD: process.env.PASSWORD,
      DB: process.env.DB,
      dialect: process.env.DIALECT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    test: {
      HOST: process.env.HOST,
      USER: process.env.USER,
      PASSWORD: process.env.PASSWORD,
      DB: process.env.TEST_DB,
      dialect: process.env.DIALECT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    production: {
      HOST: process.env.HOST,
      USER: process.env.USER,
      PASSWORD: process.env.PASSWORD,
      DB: process.env.DB,
      dialect: process.env.DIALECT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  };

  module.exports = dbConfig;
  