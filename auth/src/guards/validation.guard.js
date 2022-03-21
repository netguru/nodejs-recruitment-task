const { isEmpty } = require("../helpers/util/common");

const checkPayload = (req, res, next) => {
  if (isEmpty(req.body)) {
    res.statusCode = 400;
    next('Invalid payload');
  }

  next();
};

module.exports = {
  checkPayload,
};
