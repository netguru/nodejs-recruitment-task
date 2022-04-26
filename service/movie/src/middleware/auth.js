const jwt = require("jsonwebtoken");
const path = require("path");
const authErrors = require("../error/auth-error");
require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

const tokenSecret = process.env.JWT_SECRET || "secret";
//TODO secret

function authMiddleware(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) next(authErrors.authMissing);


    const [__, token] = authHeader.split(' ');
    try {
        req.user = jwt.verify(token, tokenSecret);
    } catch (e) {
        next(authErrors.invalidToken(e))
    }
    next();
}

module.exports = authMiddleware;
