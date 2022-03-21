require('dotenv').config();
const app = require('./app');
const dbConnect = require('./db');
const {PORT, DB_NAME} = require('./helpers/config');

const startServer = async () => {
  await dbConnect(DB_NAME);
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

startServer();
