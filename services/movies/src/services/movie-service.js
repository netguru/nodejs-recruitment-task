const Omdbapi = require('../api/omdbapi');
const MovieRepository = require('../database/movie-repository');

const MovieService = {
  /**
     * Create a movie
     *
     * @param title
     * @param user
     * @returns {Promise<{createdAt: Date, director, genre, title, userId: *, released}>}
     */
  createMovie: async function (title, user) {
    const isAllowed = await this.isAllowedToCreate(user);

    if (!isAllowed) {
      throw new Error('The user is not allowed to create more than 5 movies per month');
    }

    const movieData = await Omdbapi.getByTitle(title);
    const { Title, Released, Genre, Director } = movieData;
    const movie = {
      title: Title,
      released: Released,
      genre: Genre,
      director: Director,
      userId: user.userId,
      createdAt: new Date()
    };

    await MovieRepository.create(movie);

    return movie;
  },
  /**
     * Check if a user is allowed to create movies bases on his role
     *
     * @param user
     * @returns {Promise<boolean>}
     */
  isAllowedToCreate: async function (user) {
    const userMovies = await MovieRepository.findUserMoviesFromCurrentMonth(user.userId);

    if (user.role === 'basic') {
      return userMovies.length < 5;
    }

    return true;
  }
};

module.exports = MovieService;
