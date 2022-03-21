const express = require('express');
const router = express.Router();

const movies = require('./movie.route');

router.use('/movies', movies);

module.exports = router;
