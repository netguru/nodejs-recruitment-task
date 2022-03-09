const mongoose = require('mongoose')

const Tracker = mongoose.model('Tracker', new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    startDate: {
        type: Date
    },
    postCount: {
        type: Number,
        default: 0
    }
}))

module.exports = { Tracker };