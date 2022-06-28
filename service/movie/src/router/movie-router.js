const express = require("express");
const constants = require("../common/constants")
const MovieController = require("../controller/movie-controller")
const authMiddleware = require("../middleware/auth")

const router = express.Router();

router.use(authMiddleware);
router.get(constants.routes.movie.get, MovieController.get)
router.post(constants.routes.movie.create, MovieController.create)

module.exports = router;

