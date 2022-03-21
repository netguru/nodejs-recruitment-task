const {getMovieCount} = require('../controllers/movie.controller');
const {isEmpty} = require('../helpers/util/common')

const checkPayload = (req, res, next) => {
  if (isEmpty(req.body)) {
    res.statusCode = 400;
    next('Invalid payload');
  }

  next();
};

const checkTitle = (req, res, next) => {
  const {title} = req.body;

  if (!title) {
    res.statusCode = 400;
    next('Invalid title');
  }

  next();
};

const checkBasicMonthlyLimit = async (req, res, next) => {
  const {userId, role} = req.user;

  try {
    if (role === 'basic') {
      const month = new Date().getMonth();
      const movieCount = await getMovieCount(userId, month + 1);

      if (movieCount > 4) {
        res.statusCode = 422;
        next('User monthly limit reached');
      }
    }
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = {
  checkTitle,
  checkBasicMonthlyLimit,
  checkPayload,
};
