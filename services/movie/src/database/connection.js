const mongoose = require('mongoose');
const { mongoDbUrl } = require('../config');
const { fileLogger } = require('../helper/errorLogger');

module.exports = async connect => {
	try {
		await mongoose.connect(mongoDbUrl);
		connect();
	} catch (e) {
		fileLogger.error({
			label: 'mongoose connection',
			message: e.stack,
		});
	}
};
