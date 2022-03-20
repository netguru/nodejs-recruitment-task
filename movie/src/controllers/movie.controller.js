const {Movies} = require('../models/movie.model');
const {OmbApiService} = require('../service');
const {commonResponse} = require('../helpers/util/common');

// eslint-disable-next-line require-jsdoc
class AuthError extends Error { }

const getAllMoviesByUser = async (req, res, next) => {
  try {
    const {userId} = req.user;
    const movieList = await Movies.find({creator: userId});

    return res.status(200).json(
      commonResponse(true, movieList),
    );
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json(
        commonResponse(false, undefined, error.message),
      );
    }

    next(error);
  }
};

const createMovieByUser = async (req, res, next) => {
  const {userId} = req.user;

  try {
    const movieDetails = await OmbApiService.getMovieDetails(req.body.title);

    const newMovie = new Movies({
      ...movieDetails,
      creator: userId,
    });

    const movie = await newMovie.save();

    return res.status(201)
      .json(
        commonResponse(true, movie),
      );
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401)
        .json(
          commonResponse(false, undefined, error.message),
        );
    }

    if (error.message === 'Movie not found') {
      return res.status(404).json(
        commonResponse(false, undefined, error.message),
      );
    }

    next(error);
  }
};

const getMovieCount = async (userId, month) => {
  const movies = await Movies.aggregate(
    [
      {
        $project: {
          month: {$month: '$createdAt'},
          creator: '$creator',
        },
      },
      {
        $match: {creator: userId, month: month},
      },
    ],
  );

  return movies.length;
};

module.exports = {
  getAllMoviesByUser,
  createMovieByUser,
  getMovieCount,
};

