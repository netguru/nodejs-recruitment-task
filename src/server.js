const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { authFactory, AuthError } = require("./auth");
const Movie = require("../schema/movie");
const rateLimit = require("express-rate-limit");
const request = require('request');
const jwt = require("jsonwebtoken");
const User = require("../schema/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("./validation");
const verify = require("./verifyToken");
const dotenv = require("dotenv");
dotenv.config()

const PORT = 3000;
const { JWT_SECRET, API_KEY } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const auth = authFactory(JWT_SECRET);
const app = express();
app.use(express.json());
app.use("/movie", Movie);
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

const customMiddleware = (req, res, next) => {
  console.log("Welcome to my custom middleware");
  next();
}

app.use(customMiddleware);

// Rate limiting
const limiter = rateLimit({
  // windowMs: 10 * 60 * 1000, // 10 Mins
          // windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
          windowMs: 30 * 1000, // 24 hrs in milliseconds
          max: 5,
          message: 'Basic or Premium users cannot create more than 5 movies within every 30 seconds!',
})
app.use(limiter)
app.set('trust proxy', 1)

// Starting my logic here 
app.get("/", (req, res) => {
  res.send("index");
})

app.get("/movies", async (req, res) => {
    try {
      let movies = await Movie.find();
      // let movies = movie.find(req.body.title)
      if (movies) {
          res.send({
              // movies: movies
              data: movies
          })
      }
  } catch (err) {
      // return res.status(400).json({ err: "Movies are not defined" });
      return res.status(400).json(err.message);
  }
});

app.post("/auth/movies", verify, limiter, async (req, res, next)=> {
  console.log(req.body);
  // User.findbyOne({ _id: req.user });

  const title = req.body.title
  request({
    url : `http://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`,
    json: true
  }, (err, response, body) => {
    console.log(body);
    console.log(JSON.stringify(body, undefined, 4));
  }) 
   try {
    const myMovie = new Movie(req.body);

    // movieList Restricted for basic Users
    const myBasic = await User.find({ id: req.body.id });
    // Created movies saved
    await myMovie.save();
    return res.send(myMovie);
   } catch(err) {
    return res.status(400).json({message: err.message})
   }
   return res.send(req.users);
})



app.post("/auth/register", async (req, res) => {
  // res.send('Register');
  // Let's validate a user 
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Checking if the user is already exist in the database
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send('Username has already exist');

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // Create a new user
  const users = new User({
    id: req.body.id,
    role: req.body.role,
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword
  });

  try {
    const savedUser = await users.save();
    // res.send(savedUser);
    res.send({ users: users._id });
  } catch(err) {
  res.status(400).send(err);
  }  
});

app.post("/auth/login", async (req, res) => {
  // res.send('Login');
  // Let's validate a user 
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already exist in the database
  const users = await User.findOne({ username: req.body.username });
  if (!users) return res.status(400).send('Username is not found!!');

  // Checking password is correct or not
  const validPass = await bcrypt.compare(req.body.password, users.password);
  if(!validPass) return res.status(400).send('Invalid Password');

  // Create and Assign a token
  const token = jwt.sign({ _id: users._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
  // res.send("Logged In Successfully!");
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