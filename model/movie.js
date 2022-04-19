const mongoose = require("mongoose");

const Movie = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    serial_no: {
        type: Number,
        required: true,
        min: 9
    },
});

module.exports = mongoose.model("movie", Movie);

