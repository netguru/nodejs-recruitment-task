require('dotenv').config();
const app = require('./app');
const {PORT} = require('./helpers/config');

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

startServer();
