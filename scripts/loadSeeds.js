const usersData = require('../data/users.json');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  token: String,
  permissions: [String],
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

const mongoDbUrl = (env) => {
  const url = env.MONGO_DB_URL;

  if (!url) {
    throw new Error('MONGO_DB_URL env var is required. Set env var and run again');
  }

  return url;
}

const connect = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error('MongoDb connection error:', error);
    throw error;
  }
}

const run = async () => {
  console.log('Loading seeds');

  const url = mongoDbUrl(process.env);
  await connect(url)

  console.log('Cleaning old data');
  await User.deleteMany({})

  const users = await Promise.all(usersData.map(data => new User(data).save()));

  console.log(`${users.length} out of ${usersData.length} seeds loaded successfully`);

  process.exit(0);
}

run()
  .catch((error) => {
    console.error('Error loading seeds:', error);
    process.exit(1);
  });
