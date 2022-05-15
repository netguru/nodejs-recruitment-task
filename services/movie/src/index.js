require('dotenv').config();

const server = require('./server');
const dbConnection = require('./database/connection');
const { Console } = require('./helper');
const { port } = require('./config');

dbConnection(() => {
	Console.info('Database connected');
});

server.listen(port, () => {
	Console.info(`movies service is running at port ${port}`);
});
