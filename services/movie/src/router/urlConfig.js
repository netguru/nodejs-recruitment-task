/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const express = require('express');
const { asyncController } = require('../helper');
const { getRouteData, checkValidationResult } = require('../middleware');

const API = require('./api');

const router = express.Router();

module.exports = (api = API) => {
	api.forEach(async ({ method, controller, path, middleware = [] }) => {
		const handler = require(`../controller/${controller}.js`);

		const middlewareList = [getRouteData, ...middleware, checkValidationResult];

		router[method](path, middlewareList, asyncController(handler[method]));
	});

	return router;
};
