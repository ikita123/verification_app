const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const dbConnection = require('./config/');

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





const express = require('express');
const app = express();
const dbConnection = require('./app/utils/database');
const DefaultData = require('./app/migration/defaultData');
// const { userRoutes } = require('./app/routes/userRoutes')
const userRoutes = require('./app/routes/userRoutes');

const leadRoutes = require('./app/routes/leadRoutes');


const dotenv = require('dotenv');


dotenv.config();
app.use(express.json());

// Connect to database
dbConnection()
  .then(() => {
    console.log('Database connected!');

    // Create default user
    const defaultData = new DefaultData();
    defaultData.createDefaultUser();

    // Set up user routes
    app.use('/users', userRoutes);

    app.use('/leads', leadRoutes);

    // Start the server
    app.listen(3000, () => {
      console.log('App listening on port 3000!');
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err.message);
  });






