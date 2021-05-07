const fetch = require("node-fetch");

const Movie = require("../models/movie");

exports.createMovie = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "invalid payload" });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "invalid payload" });
  }

  try {
    let response = await fetch(
      `http://www.omdbapi.com/?t=${title}&apikey=2bbadd8f`
    );

    let json = await response.json();

    if (json.Response === "True") {
      let movie = await new Movie();

      movie.title = json.Title;
      movie.released = json.Released;
      movie.genre = json.Genre;
      movie.director = json.Director;
      movie.userId = req.user.userId;

      movie.save((err, result) => {
        if (err) {
          throw err;
        }
        res.json(result);
      });
    } else {
      return res.status(404).json({ error: json });
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    next(error);
  }
};

exports.listMovies = async (req, res, next) => {
  try {
    Movie.find({ userId: req.user.userId }).exec((err, data) => {
      if (err) {
        throw err;
      }
      res.json(data);
    });
  } catch (error) {
    if (error) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
};
