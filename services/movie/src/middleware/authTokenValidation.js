const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = (req, res, next) => {
	const authHeader = req.header('Authorization');

	if (!authHeader) {
		return res.status(401).json({ message: 'Authorization token missing' });
	}

	const token = authHeader.replace('Bearer ', '');

	req.user = jwt.verify(token, jwtSecret, (err, decodedData) => {
		if (err) {
			return res.status(401).send({ message: 'Invalid token' });
		}

		req.user = decodedData;

		next();
	});
};
