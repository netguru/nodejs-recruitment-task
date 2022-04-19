const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { authFactory, AuthError } = require("./auth");
const Movie = require("../model/movie");
const dotenv = require("dotenv");
dotenv.config()

const PORT = 3000;
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const auth = authFactory(JWT_SECRET);
const app = express();

app.use(bodyParser.json());
app.use(express.json());
mongoose.connect(
  process.env.DB_CONNECTION_STRING, 
  { useUnifiedTopology: true },
  (res, req) => {
  console.log("Connected to the DB");
})

const customMiddleware = (req, res, next) => {
  console.log("Welcome to my custom middleware");
  next();
}

app.use(customMiddleware);

app.get("/", (req, res) => {
  res.send("First Request !!!");
})

app.get("/movies", (req, res) => {
  let movies = ["EEE", "DDD", "TTT"];
  res.send({
    movies: movies,
  });
})

app.post("/create_movie", async (req, res)=> {
   console.log(req.body);
   try {
    const mymovie = new Movie(req.body);
     await mymovie.save();
    res.send(mymovie);
   } catch(err) {
     res.send({ message: error });
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
