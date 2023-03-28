// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
