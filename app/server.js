const express = require('express');

exports.createServer = ({ config, logger }) => {
  const _express = express();

  _express.locals = { config, logger };

  return _express;
};

