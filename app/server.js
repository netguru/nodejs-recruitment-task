const express = require('express');

exports.createServer = ({ config, logger }) => {
  const _express = express();

  _express
    .disable('x-powered-by')
    .use(express.json())
    .use('/health', (_, res) => res.status(200).end())
    .use((_, res) => res.status(404).json('not found'));

  _express.locals = { config, logger };

  return _express;
};

