const moviesRepository = require("./movies.repository");
const moviesHelper = require("./movies.helper");
const axios = require("axios");
const omdbapiKey = process.env.OMDB_API_KEY;

class moviesService {
  static async getMovies(req, res) {
    const movies = await moviesRepository.getMovies();

    return movies;
  }

  static async createMovie(body, userData) {
    const { title } = body;
    moviesHelper.validateTitle(title);

    if (userData.role !== "premium") {
      const oneMonthAgoDate = moviesHelper.subtractMonths(1);

      const userMoviesInLastMonth = await moviesRepository.getMovies({
        user: userData.userId,
        createdAt: { $gte: oneMonthAgoDate },
      });
      if (userMoviesInLastMonth.length >= 5) {
        throw new Error(
          "only premium users can add more than 5 movies per month"
        );
      }
    }

    const url = moviesHelper.getOMDBLink(title, omdbapiKey);
    const result = await axios({
      method: "get",
      url
    });

    await moviesRepository.createMovie({
      ...result.data,
      userId: userData.userId,
    });

    return { message: "movie added" };
  }
}

module.exports = moviesService;
