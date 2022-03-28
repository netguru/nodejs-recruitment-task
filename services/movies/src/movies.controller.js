const moviesService = require("./movies.service");
class moviesController {
  static async getMovies(req, res) {
    try {
      const movies = await moviesService.getMovies();
      res.status(200).json({
        status: true,
        data: movies,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  static async createMovie(req, res) {
    try {
      const { body } = req;
      const { userData } = req;
      const { message } = await moviesService.createMovie(body, userData);

      res.status(200).json({
        status: true,
        message,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = moviesController;
