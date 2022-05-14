const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { isProduction, siteOriginURL } = require('./config');
const { fileLogger, Console } = require('./helper/errorLogger');
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
server.use((err, req, res) => {
	fileLogger(err.message);

	res.status(500).json({ error: 'internal server error' });
});

dbConnection(() => {
	Console.info('Database connected');
});

module.exports = server;
