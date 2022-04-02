const express = require('express');
const auth = require('./middlewares/auth.middleware');
const { validator, createMoviesValidation } = require('./middlewares/validation.middlewares');
const { createMovies, getUserMovies } = require('./controllers/movies.controller');
const { getAllMovies } = require('./services/movies.service');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('hello');
    return res.json(`The server is up and working as at ${Date.now()}`);
});

router.post('/movies', [auth, validator(createMoviesValidation)], createMovies);
router.get('/movies', auth, getUserMovies);

module.exports = router;
