const express = require('express');

exports.createServer = ({ config, logger }) => {
  const _express = express();

  _express.locals = { config, logger };

  _express.use('/health', (_, res) => res.status(200).end());

  return _express;
};

