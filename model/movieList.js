const mongoose = require("mongoose");

const MovieList = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        min: 40,
        max: 255,
        required: true
    },
    postCount: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model("movieList", MovieList);