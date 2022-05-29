const jwt = require("jsonwebtoken");

const tokenSecret = process.env.JWT_SECRET;

/**
     * Authenticate the users before making any action
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
 */
const protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
        req.user = jwt.verify(token, tokenSecret)
        next()
      } catch (error) {
        console.error(error)
        res.status(401).json({error:'Not authorized, token failed'})
      }
    }
  
    if (!token) {
      res.status(401).json({error:'Not authorized, no token'})
    }
  }

module.exports = protect;
