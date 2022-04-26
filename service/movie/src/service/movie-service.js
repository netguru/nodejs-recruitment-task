const movieRequest = require("../util/movie-request");
const movieDao = require("../dao/movie-dao");
const movieErrors = require("../error/movie-error");


const movieService = {
    get:  function (userId) {
        return movieDao.getMoviesByUser(userId);
    },
    create: async function (title, user) {
        let {Title, Released, Genre, Director} = await movieRequest.getMovieDetails(title);
        const currentDate = new Date();

        if (user.role === "basic" && await movieDao.getMoviesInCurrentMonth(user.userId) >= 5) {
            throw movieErrors.privilegeError;
        }
        await movieDao.collisionCheck(user.userId, Title, Released);

        const movie = {
            title: Title,
            released: Released,
            genre: Genre,
            director: Director,
            userId: user.userId,
            added: currentDate
        };

        await movieDao.create(movie);
        return {Title, Released, Genre, Director, userId: user.userId};
    }
};

module.exports = movieService;
