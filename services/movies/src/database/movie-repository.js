const Movie = require('./movie-model');

const MovieRepository = {
  /**
     * Create movie
     *
     * @param movie
     * @returns {Promise<HydratedDocument<any, {}, {}>[]>}
     */
  create: async function (movie) {
    return Movie.create(movie);
  },
  /**
     * Find movies created by a specific user
     *
     * @param userId
     * @returns {Promise<Array<HydratedDocument<any, {}, {}>>>}
     */
  findByUserId: async function (userId) {
    return Movie.find({ userId }).select({ _id: 0, __v: 0 }).exec();
  },
  /**
     * Find a movie by its title and user id
     *
     * @param title
     * @param userId
     * @returns {Promise<Array<HydratedDocument<any, {}, {}>>>}
     */
  findByTitleAndUserId: async function (title, userId) {
    return Movie.find({ title, userId }).select({ _id: 0, __v: 0 }).exec();
  },
  /**
     * Find all the movies created by a user in the current month
     *
     * @param userId
     * @returns {Promise<Query<Array<HydratedDocument<any, {}, {}>>, any, {}, any>>}
     */
  findUserMoviesFromCurrentMonth: async function (userId) {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    return Movie.find({
      userId,
      createdAt: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth
      }
    });
  }
};

module.exports = MovieRepository;
