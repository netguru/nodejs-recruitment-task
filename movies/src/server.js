const express = require('express');

const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// api route mapping
server.use('/movies',(req, res) => {
  res.end('Movies API')
});


module.exports = server;