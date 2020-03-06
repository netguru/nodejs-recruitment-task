const express = require('express');

exports.createServer = ({ config }) => {
  const _express = express();

  _express.locals = { config };

  return _express;
};

