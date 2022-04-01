const express = require('express');
const { validator, createMoviesValidation } = require('./middlewares/validation.middlewares');
const { createMovies } = require('./movies.controller');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('hello');
    return res.json(`The server is up and working as at ${Date.now()}`);
});

router.post('/movies', [validator(createMoviesValidation)], createMovies);

module.exports = router;
