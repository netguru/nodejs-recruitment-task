require('dotenv').config();

const server = require('./server');
const { Console } = require('./helper/errorLogger');
const { port } = require('./config');

server.listen(port, () => {
	Console.info(`movies service is running at port ${port}`);
});
