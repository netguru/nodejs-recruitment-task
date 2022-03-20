const mongoose = require('mongoose');
const {DATABASE_URI} = require('./helpers/config');

const dbConnect = async (dbName) => {
  try {
    await mongoose.connect(
      `${DATABASE_URI}/${dbName}`, {
        useNewUrlParser: true,
      });
    console.log('Connected to DB');
  } catch (err) {
    console.log('MongodbError', err);
  }
};


module.exports = dbConnect;
