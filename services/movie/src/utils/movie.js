const { findUserCurrentMonthMovieList } = require('../model/movie');
const { basicUserMovieUploadCount } = require('../config');

module.exports = {
	isUserAllowToCreateMovie: async user => {
		if (user.hasBasicAccess) {
			const movieList = await findUserCurrentMonthMovieList(user.userId);

			return movieList?.length < basicUserMovieUploadCount;
		}

		// for premium user
		return true;
	},
};
