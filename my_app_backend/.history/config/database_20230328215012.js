const mongoose = require('mongoose');

async function dbConnection() {
  await mongoose.connect('here ', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = dbConnection;