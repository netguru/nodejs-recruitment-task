const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;

class MovieHelper {
    static async getMovieDetails(title) {
        try {
            console.log(API_KEY);
            const URL = `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache'
                }
            };

            const response = await axios.get(URL, options);
            if (response.data.Response === 'False') {
                return false;
            }
            return response.data;
        } catch (error) {
            return error;
        }
    }
}

module.exports = MovieHelper;
