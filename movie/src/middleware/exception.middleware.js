const notFound = (req, res, next) => {
  res.status(404);
  next(`Not Found - ${req.originalUrl}`);
};

const errorHandler = (error, _, res, __) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const response = {
    success: false,
    message: error.message,
  };

  response.error = statusCode === 500 ? 'Internal server error' : error;
  return res.json(response);
};

module.exports = {
  notFound,
  errorHandler,
};
