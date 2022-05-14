const { findUserCurrentMonthMovieList } = require('../model/movie');
const { basicUserMovieUploadCount } = require('../config');

module.exports = {
	isUserAllowToCreateMovie: async user => {
		if (user.hasBasicAccess) {
			const movieCount = await findUserCurrentMonthMovieList(user.userId);

			return movieCount?.length < basicUserMovieUploadCount;
		}

		// for premium user
		return true;
	},
};
