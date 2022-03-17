const dbConfig = {
    development: {
      HOST: process.env.HOST,
      USER: process.env.USER,
      PASSWORD: process.env.PASSWORD,
      DB: process.env.DB,
      dialect: process.env.DIALECT
    },
    test: {
      db_url: process.env.TEST_DB_URL
    },
    production: {
      HOST: process.env.HOST,
      USER: process.env.USER,
      PASSWORD: process.env.PASSWORD,
      DB: process.env.DB,
      dialect: process.env.DIALECT
    }
  };

  module.exports = dbConfig;
  