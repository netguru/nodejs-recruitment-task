const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return res.status(401).send('Access denied. No token provided.');

    try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    }
    catch (ex) {
        res.status(401).send('Access denied');
    }
}
