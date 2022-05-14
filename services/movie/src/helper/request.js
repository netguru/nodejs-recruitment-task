const axios = require('axios');

const { omdbApiKey, omdbUrl } = require('../config');

const omdbAPIRequest = axios.create({
	baseURL: omdbUrl,
	params: {
		apikey: omdbApiKey,
	},
});

// Response interceptors
omdbAPIRequest.interceptors.response.use(
	response => response.data,
	error => Promise.reject(error)
);

module.exports = { omdbAPIRequest };
