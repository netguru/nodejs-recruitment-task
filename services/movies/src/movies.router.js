const express = require("express");
const moviesRouter = express.Router();
const moviesController = require("./movies.controller");
const auth = require("./middlewares/auth");

moviesRouter.get("/", auth, moviesController.getMovies);

moviesRouter.post("/", auth, moviesController.createMovie);

module.exports = moviesRouter;
