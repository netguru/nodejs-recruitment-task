const express = require("express");
const bodyParser = require("body-parser");

const { APP_PORT } = process.env;

// routes
const authRoutes = require("./routes/auth");

const app = express();

// middleware
app.use(bodyParser.json());

// routes middleware
app.use("/auth", authRoutes);

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
