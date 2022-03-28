const Movie = require("./movies.model");
class moviesRepository {
  static async getMovies(filters) {
    const movies = await Movie.find(filters).select({
      Title: 1,
      Genre: 1,
      Director: 1,
      Released: 1,
    });

    return movies;
  }

  static async createMovie(movieData) {
    const { Title, Released, Genre, Director, userId } = movieData;
    const newMovie = new Movie({
      Title,
      Released,
      Genre,
      Director,
      user: userId,
    });

    await newMovie.save();
  }
}

module.exports = moviesRepository;
