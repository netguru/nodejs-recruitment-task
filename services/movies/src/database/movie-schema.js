const { Schema } = require('mongoose');

/**
 * Movie collection schema
 */
const movieSchema = new Schema({
  title: String,
  genre: String,
  director: String,
  released: Date,
  userId: Number
}, { collection: 'movies', timestamps: true });

module.exports = movieSchema;
