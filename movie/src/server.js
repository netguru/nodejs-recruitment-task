require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const PORT = 3002;

const app = express();
app.use(cors());

app.use(bodyParser.json());

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node.js recruitment task." });
});

require("./routes/movie.route")(app);


app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`movie svc running at port ${PORT}`);
});
