const verify = (req, res, next) => {
    const bearerHeader = req.headers.authorization
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(400).send('Invalid token')
    }
}

module.exports = { verify };