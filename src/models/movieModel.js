const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
  {

    title: {
        type: String,
        required: true,
    },
    released: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    added:{
        type: Date,
        required: true
    }

},{
    timestamps: true,
  }
)

const Movie = mongoose.model('Movie', movieSchema)


module.exports = Movie
