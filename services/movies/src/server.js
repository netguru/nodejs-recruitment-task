const express = require("express");
const moviesRouter = require('./movies.router.js');
const bodyParser = require("body-parser");
const app = express();
require('./config/db');

app.use(bodyParser.json());
app.use('/movies', moviesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

