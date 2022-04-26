const movieService = require("../service/movie-service");
const movieValidation = require("../model/schema/movie-schema");
const reqBodyValidationError = require("../error/validation-error")

const movieController = {
    get: async function (req, res, next) {
        const movies = await movieService.get(req.user.userId);
        res.status(200).send(movies);
    },
    create: async function (req, res, next) {
        const {value, error} = movieValidation.create.validate(req.body);
        if (error) {
            next(reqBodyValidationError.movieError(error.message))
        }
        try {
            const movie = await movieService.create(value.title, req.user);
            res.status(200).send(movie);
        } catch (e) {
            next(e, req, res);
        }
    }
};

module.exports = movieController;
