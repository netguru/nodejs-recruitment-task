const jwt = require("jsonwebtoken");
const request = require("request");
const dotenv = require("dotenv");
const { Movies } = require("../models/movies");
const { Tracker } = require("../models/tracker");
dotenv.config();
const { API_KEY } = process.env;

const createMovies = async (req, res, next) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
      if (err) {
        res.send(err)
      } else {
        try {
          let { title } = req.body;
          request(
            `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`,
            async function(error, response, body) {
              if(!error && response.statusCode === 200) {
                let result = JSON.parse(body);
                let movie = new Movies({
                  title: title,
                  released: result.Released,
                  genre: result.Genre,
                  director: result.Director
                })
  
                const user = await Tracker.find({ userId: { $eq: authData.userId } })
                if (user.length > 0) {
                  if (authData.role === 'basic') {
                    let start = user[0].startDate;
                    let startMonth = start.getUTCMonth() + 1;
                    let startYear = start.getUTCFullYear();
                    let count = user[0].postCount;
                    let newDate = new Date();
                    let newMonth = newDate.getUTCMonth() + 1;
                    let newYear = newDate.getUTCFullYear();
                    if (startMonth === newMonth && startYear === newYear && count >= 5) {
                      return res.send("You can't make more than 5 request in a month")
                    } 
                    if(startMonth !== newMonth) {
                      let updateExistingTracker = await Tracker.findByIdAndUpdate(user[0]._id, {
                        startDate: new Date(),
                        postCount: 1
                      }, {
                        new: true,
                        runValidators: true,
                        })
                    }
                  }
                  let counter = user[0].postCount;
                  let id = user[0]._id;
                  let updateExistingTracker = await Tracker.findByIdAndUpdate(id, {
                    postCount: ++counter
                  }, {
                    new: true,
                    runValidators: true,
                    })
                }
                if (user.length < 1) {
                  let tracker = new Tracker({
                    userId: authData.userId,
                    startDate: new Date,
                    postCount: 1
                  });
                  tracker = await tracker.save()
                }
                movie = await movie.save()
                res.send({
                  movie
                })
              } else {
                res.json(error)
              }
            }
          )
        } catch (error) {
          res.send({ error })
        }
      }
    })
  }

  const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.find();
        if (movies) {
            res.send({
                data: movies
            })
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
  }

  module.exports = { createMovies, getAllMovies }
