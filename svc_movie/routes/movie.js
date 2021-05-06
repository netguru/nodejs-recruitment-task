const express = require("express");
const router = express.Router();

const { createMovie } = require("../services/movie");

router.post("/", createMovie);

module.exports = router;
