const { createServer } = require('./server');
const { createConfig } = require('./config');

try {
  const config = createConfig(process.env)
  const server = createServer();

  server.listen(config.appPort, () => {
    console.info(`App is running on port ${config.appPort}`);
  }).on('error', (error) => {
    console.error('App failed to start with error:', error);
    process.exit(1);
  });
} catch (error) {
  console.error('App failed to start with error:', error);
  process.exit(1);
}
