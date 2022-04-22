const express = require("express");
const constants = require("../common/constants")
const MovieController = require("../controller/movie-controller")

const router = express.Router();

// router.use(authentification);
router.get(constants.routes.movie.get, MovieController.get)
router.get(constants.routes.movie.create, MovieController.create)

