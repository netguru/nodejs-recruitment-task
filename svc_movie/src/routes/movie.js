const express = require("express");
const router = express.Router();

const { createMovie, listMovies } = require("../services/movie");
const { verifyAccessToken } = require("../helpers/token");
const { checkRoleLimiters } = require("../helpers/checkRoleLimiters");

router.post("/", verifyAccessToken, checkRoleLimiters, createMovie);
router.get("/", verifyAccessToken, listMovies);

module.exports = router;
