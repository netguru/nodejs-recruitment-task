const movieErrors = require("../error/movie-error");

const axios = require("axios");
const apikey = process.env.OMDb_API_KEY;
const request = {
    getMovieDetails: async function (title) {
        const movie = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${apikey}`);
        if (movie.data.Error) {
            throw movieErrors.detailsError;
        }
        return movie.data;
    }
}

module.exports = request;
