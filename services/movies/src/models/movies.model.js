const mongoose = require('mongoose');
const { Schema } = mongoose;

const moviesSchema = new Schema({
    Title: { type: String, required: true },
    Released: { type: Date, required: true },
    Genre: { type: String, required: true },
    Director: { type: String, required: true },
    user: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
});

// Title: string;
// Released: date;
// Genre: string;
// Director: string;

moviesSchema.index({ Title: 1 });
module.exports = mongoose.model('movies', moviesSchema);
