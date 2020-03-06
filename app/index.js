const { createServer } = require('./server');

const server = createServer();

server.listen(3000, () => {
  console.info('App is running on port 3000');
}).on('error', (error) => {
  console.error('App failed to start with error:', error);
  process.exit(1);
});
