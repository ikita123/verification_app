const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const dbConnection = require('./config/database');

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






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






