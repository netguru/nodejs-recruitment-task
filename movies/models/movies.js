const mongoose = require('mongoose')

const Movies = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: 'string',
        unique: true
    },
    released: {
        type: Date
    },
    genre: {
        type: 'string'
    },
    director: {
        type: 'string'
    }
}))

module.exports = { Movies };