const mongoose = require('mongoose');
const server = require('./server');
const { mongoDbUrl, port } = require('./config/config');

async function main () {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await server.listen(port);
    console.log('Server started');
  } catch (e) {
    throw new Error(e);
  }
}

main();
