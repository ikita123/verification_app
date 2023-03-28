const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.route');

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});