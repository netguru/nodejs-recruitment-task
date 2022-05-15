const authTokenValidation = require('./authTokenValidation');
const getRouteData = require('./getRouteData');
const { checkValidationResult, validator } = require('./validator');
const userType = require('./userType');

module.exports = {
	authTokenValidation,
	getRouteData,
	checkValidationResult,
	validator,
	userType,
};
