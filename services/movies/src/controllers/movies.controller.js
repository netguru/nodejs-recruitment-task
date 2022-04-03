const { httpResponse } = require('../helpers/response.helper');
const MoviesService = require('../services/movies.service');

exports.createMovies = async (req, res) => {
    const result = await MoviesService.createMovies(req.user, req.body.title);
    return httpResponse(res, result);
};

exports.getUserMovies = async (req, res) => {
    const result = await MoviesService.getAllMovies(req.user);
    return httpResponse(res, result);
};
