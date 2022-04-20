const mongoose = require("mongoose");

const Movie = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
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
    }
});


module.exports = mongoose.model("movie", Movie);