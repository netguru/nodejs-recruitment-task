const Movie = require("../models/movie");

const { MOVIES_LIMIT } = process.env;

exports.checkRoleLimiters = (req, res, next) => {
  if (req.user.role === "basic") {
    const userId = req.user.userId;
    let date = new Date();
    Movie.find({
      $and: [
        {
          createdAt: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1), // first day of current month
            $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0), // last day of current month
          },
        },
        { userId: userId },
      ],
    }).countDocuments(function (err, count) {
      if (count >= MOVIES_LIMIT) {
        return res
          .status(400)
          .json(
            `You reached your monthly limit of movies which is ${MOVIES_LIMIT}`
          );
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
