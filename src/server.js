const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const cors = require('cors')

const connectDB = require("./configs/dbConnection");
const {errorHandler,notFound} = require('./middlewares/error');

const { authFactory, AuthError } = require("./auth");


require('dotenv').config({ path: path.resolve(__dirname, './.env') })

connectDB()


const PORT = process.env.PORT 
const  JWT_SECRET  = process.env.JWT_SECRET || '';


if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}
const movieRoutes = require('./routes/movieRoutes');

const auth = authFactory(JWT_SECRET);

const app = express()

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

app.post("/auth", (req, res, next) => {
    console.log(req.body)
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

app.use('/movies', movieRoutes)

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);
  return res.status(500).json({ error: "internal server error" });
});

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
