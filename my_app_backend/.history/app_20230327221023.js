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
    
    // app.use((req, res, next) => {
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //   if (req.method === 'OPTIONS') {
    //     res.sendStatus(200);
    //   } else {
    //     next();
    //   }
    // });

    app.use('/auth', authRoutes);
    app.use(cors());

    app.listen(3000, () => {
      console.log(`Server listening on port`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err.message);
  });
