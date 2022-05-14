const Joi = require('joi');

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

		req.validationResult = joiSchema.validate(req.routeData, {
			abortEarly: false,
		});

		next();
	};
};

const checkValidationResult = (req, res, next) => {
	if (req.validationResult) {
		if (req.validationResult.error) {
			const validationError = {};

			req.validationResult.error.details?.forEach(({ message, context }) => {
				validationError[context.key] = message;
			});

			// send error to the client
			return res.status(422).json(validationError);
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
