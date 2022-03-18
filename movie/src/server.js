require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node.js recruitment task." });
});

require("./routes/movie.route")(app);

const dbStart = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
}
if(process.env.NODE_ENV !== 'test' || process.env.NODE_ENV === 'undefined'){
  dbStart()
}

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

module.exports = app;