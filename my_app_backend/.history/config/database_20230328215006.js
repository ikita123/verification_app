const mongoose = require('mongoose');

async function dbConnection() {
  await mongoose.connect('mongodb+srv://nikitasharma:nikita-sharma@cluster1.poqels0.mongodb.net/new_app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = dbConnection;