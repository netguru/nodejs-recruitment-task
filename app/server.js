const express = require('express');

exports.createServer = ({ config, logger }) => {
  const _express = express();


  _express
    .disable('x-powered-by')
    .use('/health', (_, res) => res.status(200).end());

  _express.locals = { config, logger };

  return _express;
};

