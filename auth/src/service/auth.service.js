const jwt = require('jsonwebtoken');
const { users } = require('../helpers/users');

// eslint-disable-next-line require-jsdoc
class AuthError extends Error {}

const authFactory = (secret) => (username, password) => {
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    throw new AuthError('Invalid username or password');
  }

  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
    },
    secret,
    {
      issuer: 'https://www.netguru.com/',
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    },
  );
};


module.exports = {
  authFactory,
  AuthError,
};
