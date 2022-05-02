const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongoDbUrl: process.env.MONGODB_URL,
  omdbUrl: process.env.OMDB_URL,
  omdbApiKey: process.env.OMDB_API_KEY
};
