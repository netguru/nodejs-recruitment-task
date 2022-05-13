require('dotenv').config()

const server = require('./server');

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`movies service is running at port ${PORT}`)
})