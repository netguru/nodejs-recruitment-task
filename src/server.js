const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = 3000;

// routes
const authRoutes = require("./routes/auth");

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
app.use("/auth", authRoutes);

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
