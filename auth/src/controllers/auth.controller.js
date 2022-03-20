const {AuthError} = require('../service/auth.service');
const {AuthService} = require('../service');
const {JWT_SECRET} = require('../helpers/config');
const { commonResponse } = require('../helpers/util/common');

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env var. Set it and restart the server');
}

const auth = AuthService.authFactory(JWT_SECRET);

const authenticateUser = (req, res, next) => {
  const {username, password} = req.body;

  try {
    const token = auth(username, password);

    return res.status(200).json({token});
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json(
        commonResponse(false, undefined, error.message),
      );
    }

    next(error);
  }
};

module.exports = {
  authenticateUser,
};
