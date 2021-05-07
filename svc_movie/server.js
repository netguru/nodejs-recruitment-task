const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./routes/swagger.json");

const { APP_PORT } = process.env;

// routes
const movieRoutes = require("./routes/movie");

const app = express();

// database
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(bodyParser.json());

// routes middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/movies", movieRoutes);

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(APP_PORT, () => {
  console.log(`auth svc running at port ${APP_PORT}`);
});
