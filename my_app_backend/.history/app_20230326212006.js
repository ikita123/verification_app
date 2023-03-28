const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const dbConnection = require('./config/database');
const bodyParser = require('body-parser');


app.use(express.json());







// Connect to database
dbConnection()
  .then(() => {
    console.log('Database connected!');

  
    app.use('/auth', authRoutes);
    app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
  })
  .catch((err) => {
    console.error('Error connecting to database:', err.message);
  });






