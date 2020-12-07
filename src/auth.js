const jwt = require("jsonwebtoken");

const users = [
  {
    id: 123,
    role: "basic",
    name: "Basic Thomas",
    username: "basic-thomas",
    password: "sR-_pcoow-27-6PAwCD8",
  },
  {
    id: 434,
    role: "premium",
    name: "Premium Jim",
    username: "premium-jim",
    password: "GBLtTyq3E_UNjFnpo9m6",
  },
];

class AuthError extends Error {}

const authFactory = (secret) => (username, password) => {
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    throw new AuthError("invalid username or password");
  }

  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
    },
    secret,
    {
      issuer: "https://www.netguru.com/",
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    }
  );
};

module.exports = {
  authFactory,
  AuthError,
};
