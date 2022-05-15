const { isUserAllowToCreateMovie } = require('../utils/movie');
const {
	findMovieByTitleAndUserId,
	findMovieByUserId,
	createMovie,
} = require('../model/movie');
const OmdbAPI = require('../providers/OmdbAPI');

const omdbAPI = new OmdbAPI();

module.exports = {
	get: async (req, res) => {
		const movies = await findMovieByUserId(req.user.userId);

		res.status(200).send(movies);
	},
	post: async (req, res) => {
		const userData = req.user;

		// check user is able to create movie
		if (!(await isUserAllowToCreateMovie(userData))) {
			return res.status(400).json({
				message:
					'User not allow to save new movies, Already fill up this month quote',
			});
		}

		// fetch movie data
		const movieDetails = await omdbAPI.getDetails(req.routeData.title);

		if (!movieDetails) {
			return res.status(404).json({
				message: 'Movie not found',
			});
		}

		// check if the movie already exist for this user
		if (await findMovieByTitleAndUserId(movieDetails.Title, userData.userId)) {
			return res.status(400).json({
				message: 'Already have this movie in list',
			});
		}

		const movieObj = {
			title: movieDetails.Title,
			released: movieDetails.Released,
			genre: movieDetails.Genre,
			director: movieDetails.Director,
			userId: userData.userId,
		};

		if (await createMovie(movieObj)) {
			return res.status(201).json(movieObj);
		}

		// if system fail to create movie
		res.status(424).json({
			message: 'unable to create movie data',
		});
	},
};
