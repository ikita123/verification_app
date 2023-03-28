const mongoose = require('mongoose');

async function dbConnection() {
  await mongoose.connect('here you should put ', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = dbConnection;