require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');  // Pastikan ini ada dan benar
const userRoutes = require('./api/controllers/routes/userRoutes');  // Pastikan path sesuai

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware untuk parsing JSON
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  db.getConnection((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      console.error(err.stack); // Debugging tambahan
    } else {
      console.log('Connected to MySQL database gantara_db.');
    }
  });
});
