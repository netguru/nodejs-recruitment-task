const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middleware/auth');
const MoviesController = require('./controllers/movie-controller.js');

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(auth);

server.get('/movies', MoviesController.get);
server.post('/movies', MoviesController.create);

module.exports = server;
