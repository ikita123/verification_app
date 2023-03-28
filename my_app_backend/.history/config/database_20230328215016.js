const mongoose = require('mongoose');

async function dbConnection() {
  await mongoose.connect('here you shou', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = dbConnection;