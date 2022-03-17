const axios = require('axios');
const { checkMonthlyMovieCreateAccess } = require("../helpers/movieTrackDataCheck")
const Movie = require('../models').Movie;
const MovieCreateTrack = require('../models').MovieCreateTrack;

exports.create = async (req, res) => {
  let currentMonth = new Date().getMonth() + 1;
  let currentYear  = new Date().getFullYear();
  if(req.user.role === 'basic'){
    let canUserCreateMovie = await checkMonthlyMovieCreateAccess(req.user.userId, currentMonth, currentYear);
    if(!canUserCreateMovie){
      return res.status(400).send({message: `You can't create more than 5 movie in a month.
       If you want to create more movie, You have to upgrade your current plan`})
    }
  }

  if (!req.body.title) {
    return res.status(400).send({message: "Title Required!"});
  }
  
  const movieData = {
    userId: req.user.userId
  };
  let newMovie;

  try {
    const response = await axios.get(`http://www.omdbapi.com/?t=${req.body.title}&apikey=${process.env.APIKEY}`, {
      timeout: 30000
    });
    if(response && response.data && response.data.Response === 'True') {
      const { Released, Genre, Director, Title} = response.data;
      movieData.title= Title,
      movieData.released = Released;
      movieData.genre = Genre;
      movieData.director = Director;
    } else {
      return res.status(404).send({message: 'movie not found.'})
    }
    newMovie = await Movie.create(movieData)
    if(req.user.role === 'basic'){
      await checkMovieCreateDataRecord(req.user.userId, currentMonth, currentYear)
    }
    res.status(201).send(newMovie);
  } catch(ex) {
    res.status(500).send({
      message:
        ex.message || "Some went wrong."
    });
  }
};

exports.findAll = async (req, res) => {
  const condition = { userId: req.user.userId };
  try {
    const movies = await Movie.findAll({ where: condition });
    res.send(movies);
  } catch(ex) {
    res.status(500).send({
      message:
        ex.message || "Some went wrong."
    });
  }
};


async function checkMovieCreateDataRecord(userId, currentMonth, currentYear){
  let checkTrachDataExist = await MovieCreateTrack.findOne({ where: { month: currentMonth, year: currentYear, userId: userId  } });
      if(checkTrachDataExist){
        await MovieCreateTrack.update({count: checkTrachDataExist.count + 1 }, {
          where: { id: checkTrachDataExist.id }
        })
      } else {
        const movieCreateTrackData = {
          month: currentMonth,
          year: currentYear,
          count: 1,
          userId: userId
        };
        await MovieCreateTrack.create(movieCreateTrackData)
      }
}
