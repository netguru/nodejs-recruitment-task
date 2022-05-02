const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

/**
 * Middleware to authenticate users before making actions with
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    next('You do not have permission to access this route');
  }

  try {
    const token = authHeader.replace('Bearer ', '');

    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
