const router = require("express").Router();

const movies = require("../controllers/movie.controller.js");
const auth  = require('../middleware/auth');

module.exports = app => {
    
    router.post("/", auth, movies.create);
    router.get("/", auth, movies.findAll);

    app.use("/movies", router);
  
};