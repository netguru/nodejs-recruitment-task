const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Director: {
    type: String,
    required: true,
  },
  //user who created this movie
  user: {
    type: Number,
    required: true,
  },
  Released: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("movie", movieSchema);
