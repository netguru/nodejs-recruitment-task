const express = require('express');
const router = express.Router();

const {Auth} = require('../controllers');
const {Guard} = require('../guards');

router.use(Guard.checkPayload);

// Authenticate user
router.post('/', Auth.authenticateUser);

module.exports = router;
