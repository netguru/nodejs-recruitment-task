const MovieService = require('../../services/movie-service');
const Movie = require('../../database/movie-model');

const Helpers = {
  /**
   * Creates some data to work with inside the tests
   *
   * @param user
   * @returns {Promise<void>}
   */
  createTestMovies: async function (user) {
    const movies = ['Stargate', 'Friends', 'Criminal Minds', 'Prison Break', 'The Blacklist'];

    for (let i = 0; i < movies.length; i++) {
      await MovieService.createMovie(movies[i], user);
    }
  },
  /**
   * Delete all the movies from the two users
   *
   * @param basicUser
   * @param premiumUser
   * @returns {Promise<void>}
   */
  clearDatabase: async function (basicUser, premiumUser) {
    await Movie.deleteMany({ userId: basicUser.userId });
    await Movie.deleteMany({ userId: premiumUser.userId });
  }
};

module.exports = Helpers;
