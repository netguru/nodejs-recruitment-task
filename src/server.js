const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const request = require("request");
const { pipeline } = require("stream");
const { Movies } = require("./models/movies")
const { Tracker } = require("./models/tracker")
const { config } = require("./config/config");
const { authFactory, AuthError } = require("./auth");
const { verify } = require("./middleware/verify");
const app = express();

const PORT = 3009;
const { JWT_SECRET, API_KEY } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}
const auth = authFactory(JWT_SECRET);

mongoose.connect(config.mongo.url)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.error('Could not connect to MongoDB...'));

  app.use(express.json());




app.use(bodyParser.json());

app.post("/auth", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "invalid payload" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "invalid payload" });
  }

  try {
    const token = auth(username, password);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
});

app.post("/movies", verify, async (req, res, next) => {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.sendStatus(err)
    } else {
      try {
        console.log("Data", authData)
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
              console.log("User", user)
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
})

app.get('/movies', async (req, res) => {
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
})

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});

module.exports = { app }