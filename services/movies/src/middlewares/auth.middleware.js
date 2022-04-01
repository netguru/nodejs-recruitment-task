const auth = (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  if (!authorizationToken) {
    return res.status(401).json({
      status: false,
      message: "Authorization token missing in the headers!",
      error: "MISSING_TOKEN",
    });
  }
};
