const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const dbConnection = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');




app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));









// Connect to database
dbConnection()
  .then(() => {
    console.log('Database connected!');

  
    app.use('/auth', authRoutes);
    app.use(cors());
    app.use(cors({
      origin: 'http://localhost:4200'
    }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
  })
  .catch((err) => {
    console.error('Error connecting to database:', err.message);
  });






