const mongoose = require('mongoose');
const movieSchema = require('./movie-schema');

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;
