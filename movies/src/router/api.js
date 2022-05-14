const { authTokenValidation } = require('../middleware');

module.exports = [
	{
		path: '/movies',
		method: 'get',
		controller: 'movies',
		middleware: [authTokenValidation],
	},
	{
		path: '/movies',
		method: 'post',
		controller: 'movies',
		middleware: [authTokenValidation],
	},
];
