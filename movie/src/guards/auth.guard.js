const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../helpers/config');
const {sanitizeBearerToken} = require('../helpers/util/common');

const validateToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = sanitizeBearerToken(req.headers.authorization);

    jwt.verify(token, JWT_SECRET, (error, userDetails) => {
      if (error) {
        if (
          error.message === 'invalid signature' ||
          error.message === 'jwt malformed'
        ) {
          res.statusCode = 400;
          next('Invalid token');
        }

        if (
          error.message === 'jwt expired'
        ) {
          res.statusCode = 401;
          next('Token expired');
        }
      }

      req.user = userDetails;
      next();
    });
  } else {
    res.statusCode = 400;
    next('Invalid token');
  }
};


module.exports = {
  validateToken,
};
