const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { isProduction, siteOriginURL } = require('./config');
const { fileLogger, Console } = require('./helper');
const urlConfig = require('./router/urlConfig');
const dbConnection = require('./database/connection');

const server = express();

server
	.use(
		cors({
			origin: isProduction ? siteOriginURL : '*',
			optionsSuccessStatus: 200,
		})
	)
	.use(helmet())
	.use(express.json())
	.use(express.urlencoded({ extended: true }));

// api route mapping
server.use(urlConfig());

// route not found
server.use((req, res) => {
	res.status(404).json({ error: 'route not found' });
});

// server error
// eslint-disable-next-line no-unused-vars
server.use((error, req, res, next) => {
	fileLogger.error({
		label: 'internal server error',
		message: error.stack,
	});

	res.status(500).send({ error: 'internal server error' });
});

dbConnection(() => {
	Console.info('Database connected');
});

module.exports = server;
