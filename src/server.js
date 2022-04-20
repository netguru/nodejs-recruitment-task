const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { authFactory, AuthError } = require("./auth");
const Movie = require("../schema/movie");
const MovieList = require("../schema/movieList");
const request = require('request');
const dotenv = require("dotenv");
dotenv.config()

const PORT = 3000;
const { JWT_SECRET, API_KEY } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const auth = authFactory(JWT_SECRET);
const app = express();
app.use("/movie", Movie);
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

const customMiddleware = (req, res, next) => {
  console.log("Welcome to my custom middleware");
  next();
}

app.use(customMiddleware);

app.get("/", (req, res) => {
  res.send("index");
})


app.get("/movies", async (req, res) => {
  // request(`http://www.omdbapi.com/?t&apikey=${OMDB_API_KEY}`, (error, response, body) => {
    try {
      let movies = await Movie.find();
      // let movies = movie.find(req.body.title)
      if (movies) {
          res.send({
              // movies: movies
              data: movies
          })
      }
  } catch (err) {
      // return res.status(400).json({ err: "Movies are not defined" });
      return res.status(400).json(err.message);
  }
})
// }) 

app.post("/movies", async (req, res)=> {
  console.log(req.body);
  const title = req.body.title
  request({
    url : `http://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`,
    json: true
  }, (err, response, body) => {
    console.log(body);
    console.log(JSON.stringify(body, undefined, 4));
  }) 
   try {
    const myMovie = new Movie(req.body);
     await myMovie.save();
    res.send(myMovie);
   } catch(err) {
    res.status(400).json({message: err.message})
   }
   
})

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