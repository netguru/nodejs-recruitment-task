const express = require("express");
const router = express.Router();

const { createMovie, listMovies } = require("../services/movie");
const { verifyAccessToken } = require("../helpers/token");

router.post("/", verifyAccessToken, createMovie);
router.get("/", verifyAccessToken, listMovies);

module.exports = router;
