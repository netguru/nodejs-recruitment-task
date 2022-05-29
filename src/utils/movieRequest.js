const axios = require("axios");
const apiKey = process.env.OMDb_API_KEY;
const omdbUrl = process.env.OMDB_URL;

const movieRequestDetails = async function (title,res) {

        const movie = await axios.get(`${omdbUrl}/?i=${title}&apikey=${apiKey}`);
       
        if (movie.data.Error) {
            return res.status(404).json({ error:"These movie detail not exist"})
        }
        return movie.data;
    
}

module.exports = movieRequestDetails