const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    released: {
        type: Date,
        required: true
    },
    //required: [true, "date required"]
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
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;




