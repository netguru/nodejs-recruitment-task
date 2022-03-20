const got = require('got');
const {OMDB_API_KEY} = require('../helpers/config');

const omdUrl = 'http://www.omdbapi.com';
const apiKey = OMDB_API_KEY;

module.exports.getMovieDetails = async (title) => {
  try {
    const movieDetails = await got({
      url: omdUrl,
      method: 'GET',
      searchParams: {
        t: title,
        apikey: apiKey,
      },
      responseType: 'json',
      resolveBodyOnly: true,
      retry: {
        limit: 3,
      },
    });

    if (movieDetails.Response === 'False') {
      // eslint-disable-next-line no-throw-literal
      throw 'Movie not found';
    }

    return {
      title: movieDetails.Title,
      releasedDate: new Date(movieDetails.Released),
      genre: movieDetails.Genre,
      director: movieDetails.Director,
    };
  } catch (error) {
    throw new Error(error);
  }
};
