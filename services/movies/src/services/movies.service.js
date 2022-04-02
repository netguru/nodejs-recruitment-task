const { BadRequest, Conflict, Forbidden, InternalServerError, NotFound, Unauthorized } = require('http-errors');
const moment = require('moment');
const MovieHelper = require('../helpers/movies.helper');
const MoviesRepository = require('../repository/movies.repository');

class MoviesService {
    static async createMovies(user, title) {
        try {
            // get movie title from OMD
            const movieDetails = await MovieHelper.getMovieDetails(title);
            if (movieDetails === false) {
                throw NotFound('Opps!!! we could not find this movie');
            }

            // check for duplicate movies in user list
            const userMovie = await MoviesRepository.findOne({ user: user.userId, Title: movieDetails.Title });
            if (userMovie) {
                throw Conflict('This movie already exists in your list');
            }

            // using moment to get month here
            // moment.month() is zero based, so it will return 0-11
            const getMonth = moment(new Date()).month() + 1;

            // check user role and access to create movies
            if (user.role !== 'premium') {
                const userMovies = await MoviesRepository.findAllWithAggregate({
                    user: user.userId,
                    month: getMonth
                });
                if (userMovies.length >= 5) {
                    throw Forbidden('You on the basic plan, upgrade to premium to have access to create unlimited number of movies');
                }
            }

            // save movies details for user
            const result = await MoviesRepository.create({
                user: user.userId,
                Title: movieDetails.Title,
                Released: movieDetails.Released,
                Genre: movieDetails.Genre,
                Director: movieDetails.Director
            });

            return {
                status: true,
                statusCode: 201,
                message: 'Successfully saved movie',
                data: result,
                error: null
            };
        } catch (error) {
            return {
                status: false,
                statusCode: error.status || error.statusCode || 500,
                message: error.message || 'Internal server error',
                data: null,
                error
            };
        }
    }

    static async getAllMovies(user) {
        try {
            const movies = await MoviesRepository.findAll({ user: user.userId });
            return {
                status: true,
                statusCode: 201,
                message: 'Successfully fetched user movies',
                data: movies,
                error: null
            };
        } catch (error) {
            return {
                status: false,
                statusCode: error.status || error.statusCode || 500,
                message: error.message || 'Internal server error',
                data: null,
                error
            };
        }
    }
}

module.exports = MoviesService;
