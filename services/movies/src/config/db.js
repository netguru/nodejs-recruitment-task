const mongoose = require("mongoose");

const { DB_STRING } = process.env;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(DB_STRING, config);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log(`Connected to the ${db.name} database`);
});
