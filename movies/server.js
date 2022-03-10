const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { config } = require("./config/config");
const { verify } = require("../movies/middleware/verify");
const { getAllMovies, createMovies } = require("./controller/movies");
const app = express();

const PORT = 4001;

mongoose.connect(config.mongo.url)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.use(bodyParser.json());

app.post("/movies", verify, createMovies)

app.get('/movies', getAllMovies)

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is runnin on port: ${PORT}`);
});

module.exports = { app }