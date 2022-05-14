const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
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
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('movies', movieSchema);
