const { authTokenValidation } = require('../middleware');

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
		middleware: [authTokenValidation],
	},
];
