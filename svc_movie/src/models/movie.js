const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    released: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
