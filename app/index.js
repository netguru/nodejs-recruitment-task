const { createServer } = require('./server');
const { createConfig } = require('./config');

const logger = console;

try {
  const config = createConfig(process.env)
  const server = createServer({ config });

  server.listen(config.appPort, () => {
    logger.info(`App is running on port ${config.appPort}`);
  }).on('error', (error) => {
    logger.error('App failed to start with error:', error);
    process.exit(1);
  });
} catch (error) {
  logger.error('App failed to start with error:', error);
  process.exit(1);
}
