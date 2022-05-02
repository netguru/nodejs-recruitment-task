const MovieRepository = require('../database/movie-repository');
const MovieService = require('../services/movie-service');

const MoviesController = {
  /**
     * Get all the movies for a specific user
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
  get: async function (req, res, next) {
    try {
      const movies = await MovieRepository.findByUserId(req.user.userId);

      res.status(200).send(movies);
    } catch (e) {
      next(e, req, res);
    }
  },

  /**
     * Create a movie
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
  create: async function (req, res, next) {
    const { title } = req.body;

    try {
      const movie = await MovieService.createMovie(title, req.user);

      res.status(201).send(movie);
    } catch (e) {
      next(e, req, res);
    }
  }
};

module.exports = MoviesController;
