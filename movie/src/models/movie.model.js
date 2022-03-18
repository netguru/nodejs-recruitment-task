const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  released: {
    type: Date,
  },
  director: {
    type: String,
    required: false
  },
  genre: {
    type: String,
    required: false
  },
  userId: {
    type: Number
  }
}));

exports.Movie = Movie; 