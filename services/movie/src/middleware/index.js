const authTokenValidation = require('./authTokenValidation');
const getRouteData = require('./getRouteData');
const { checkValidationResult, validator } = require('./validator');

module.exports = {
	authTokenValidation,
	getRouteData,
	checkValidationResult,
	validator,
};
