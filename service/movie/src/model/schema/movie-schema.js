const Joi = require("joi");

const movieValidation = {
    create: Joi.object({
        title: Joi.string().required().label('movie title').description('This holds the movie title'),
    })
};

module.exports = movieValidation;
