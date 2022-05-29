const express = require('express');
const router = express.Router()

const movieController = require('../controllers/movies')
const  protect  = require('../middlewares/auth.js')

/**  @api {post} /movie CREATE Movie*/
router.post('/',protect,movieController.createMovie);

/**  @api {get} /movie GET Movie*/
router.get('/',protect,movieController.getMovie);

module.exports = router;
