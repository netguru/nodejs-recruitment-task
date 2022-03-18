const mongoose = require('mongoose');

const MovieCreateTrack = mongoose.model('MovieCreateTrack', new mongoose.Schema({
  month: {
    type: Number
  },
  year: {
    type: Number
  },
  count: {
    type: Number
  },
  userId: {
    type: Number
  }
}));

exports.MovieCreateTrack = MovieCreateTrack; 