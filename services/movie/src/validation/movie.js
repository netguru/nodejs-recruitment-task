const Joi = require('joi');

const movieTitle = {
	title: Joi.string().required().messages({
		'any.required': 'title is required',
		'string.empty': 'title is required',
	}),
};

module.exports = {
	movieTitle,
};
