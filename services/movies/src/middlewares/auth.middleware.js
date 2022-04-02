const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
        return res.status(401).json({
            status: false,
            message: 'Authorization token missing in the headers!',
            error: 'MISSING_TOKEN'
        });
    }

    if (typeof authorizationToken !== 'string') {
        return res.status(401).json({
            status: false,
            message: 'Invalid authorization token',
            error: 'INVALID_TOKEN'
        });
    } else {
        const [__, token] = authorizationToken.split(' ');
        try {
            const user = await JWT.verify(token, JWT_SECRET);
            req.user = user;
        } catch (error) {
            return res.status(401).json({
                status: false,
                message: 'User is not authorized',
                error: 'UN-AUTHORIZED'
            });
        }
        next();
    }
};

module.exports = auth;
