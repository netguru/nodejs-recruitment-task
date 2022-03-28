const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
module.exports = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (typeof bearerToken === "string") {
    const [_, token] = bearerToken.split(" ");

    try {
      const userData = await jwt.verify(token, JWT_SECRET);
      req.userData = userData;
    } catch (error) {
      return res.status(401).send({
        status: false,
        message: "invalid token",
      });
    }

    next();
  }
};
