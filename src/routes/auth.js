const express = require("express");
const router = express.Router();

const { login } = require("../services/auth");

router.post("/", login);

module.exports = router;
