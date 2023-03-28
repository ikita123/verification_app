const mongoose = require('mongoose');

async function dbConnection() {
  await mongoose.connect('here you should put database strig', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = dbConnection;