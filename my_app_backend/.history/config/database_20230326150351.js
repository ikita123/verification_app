const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nikitasharma:nikita-sharma@cluster1.poqels0.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB database!');
});