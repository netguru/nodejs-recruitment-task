const express = require('express');
const router = express.Router();

const {Movie} = require('../controllers');
const {AuthGuard, ValidationGuard} = require('../guards');

// Verify token for each endpoints
router.use(AuthGuard.validateToken);

// Get movie list by user
router.get('/', Movie.getAllMoviesByUser);

// Movie creation validations
router.use(ValidationGuard.checkPayload);
router.use(ValidationGuard.checkTitle);
router.use(ValidationGuard.checkBasicMonthlyLimit);

// Create new movie by user
router.post('/', Movie.createMovieByUser);

module.exports = router;
