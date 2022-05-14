const express = require('express');
const { asyncController } = require('../helper');
const { getRouteData, checkValidationResult } = require('../middleware');

const API = require('./api');

const router = express.Router();

module.exports = (api = API) => {
	api.forEach(async ({ method, controller, path, middleware = [] }) => {
		const handler = (await import(`../controller/${controller}.js`)).default;

		const middlewareList = [getRouteData, ...middleware, checkValidationResult];

		router[method](path, middlewareList, asyncController(handler[method]));
	});

	return router;
};
