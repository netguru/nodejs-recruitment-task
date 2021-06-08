import jwt from "jsonwebtoken";

const verifyUserFactory = (secret) => (token) => {
  return jwt.verify(token, secret);
};

export default verifyUserFactory;