const mongoose = require('mongoose');
const { asyncFunction } = require('../helper');

const movieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		released: {
			type: String,
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

const movieModel = mongoose.model('movies', movieSchema);

const createMovie = asyncFunction(async movie => {
	const data = await movieModel.create(movie);

	return data;
});

const findUserCurrentMonthMovieList = asyncFunction(async userId => {
	const date = new Date();
	const y = date.getFullYear();
	const m = date.getMonth();
	const firstDayOfMonth = new Date(y, m, 1);
	const lastDayOfMonth = new Date(y, m + 1, 0);

	const list = await movieModel.find({
		userId,
		createdAt: {
			$gte: firstDayOfMonth,
			$lte: lastDayOfMonth,
		},
	});

	return list;
});

const findMovieByTitleAndUserId = asyncFunction(async (title, userId) => {
	const movie = await movieModel
		.findOne({ title, userId })
		.select({ _id: 0, __v: 0 })
		.exec();

	return movie;
});

const findMovieByUserId = asyncFunction(async userId => {
	const movieList = await movieModel
		.find({ userId })
		.select({ _id: 0, __v: 0, userId: 0, created_at: 0, updated_at: 0 })
		.exec();

	return movieList;
});

module.exports = {
	movieModel,
	createMovie,
	findMovieByUserId,
	findMovieByTitleAndUserId,
	findUserCurrentMonthMovieList,
};
