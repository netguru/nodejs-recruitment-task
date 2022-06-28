const jwt = require("jsonwebtoken");
const authErrors = require("../error/auth-error");

const tokenSecret = process.env.JWT_SECRET;

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
