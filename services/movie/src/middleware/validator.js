const Joi = require('joi');
const { isDevelopment } = require('../config');

// multiple rule set can pass in validator function it will merge all the rule set
const validator = (...validationRules) => {
	let allRules = {};

	validationRules.forEach(rule => {
		allRules = {
			...allRules,
			...rule,
		};
	});

	return (req, res, next) => {
		const joiSchema = Joi.object(allRules);

		req.validationResult = joiSchema.validate(req.routeData);

		next();
	};
};

const checkValidationResult = (req, res, next) => {
	if (req.validationResult) {
		if (req.validationResult.error) {
			const returnData = {
				...req.validationResult.error.details[0].context,
				message: req.validationResult.error.details[0].message,
			};

			if (isDevelopment) {
				returnData.details = { ...req.validationResult.error.details[0] };
			}

			// send error to the client
			return res.status(422).json(returnData);
		}

		// replace with validated data
		req.routeData = req.validationResult.value;

		// don't need the validationResult in controller
		delete req.validationResult;
	}

	next();
};

module.exports = {
	validator,
	checkValidationResult,
};
