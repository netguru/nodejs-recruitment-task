const axios = require('axios');
const { omdbUrl, omdbApiKey } = require('../config/config');

const Omdbapi = {
  getByTitle: async function (title) {
    const request = `${omdbUrl}?t=${title}&apikey=${omdbApiKey}`;
    const movieDetails = await axios.get(request);

    if (movieDetails.data.Error) {
      throw new Error('The movie details could not be fetched');
    }

    return movieDetails.data;
  }
};

module.exports = Omdbapi;
