const mongoose = require("mongoose");

const User = new mongoose.Schema({
    id: {
        type: Number,
        min: 2
    },
    role: {
        type: String,
        min: 2
    },
    name: {
        type: String,
        required: true,
        max:2056,
        min: 3
    },
    username: {
        type: String,
        required: true,
        max:2056,
        min: 3
    },
    password: {
        type: String,
        required: true,
        max:2056,
        min: 3
    },
    beginDate: {
        type: Date,
        min: 2,
        max: 255
    },
    postCounter: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model("users", User);