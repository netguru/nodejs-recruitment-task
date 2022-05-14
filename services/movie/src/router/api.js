const { authTokenValidation, validator, userType } = require('../middleware');
const { movieTitle } = require('../validation');

module.exports = [
	{
		path: '/movies',
		method: 'get',
		controller: 'movie',
		middleware: [authTokenValidation],
	},
	{
		path: '/movies',
		method: 'post',
		controller: 'movie',
		middleware: [authTokenValidation, validator(movieTitle), userType],
	},
];
