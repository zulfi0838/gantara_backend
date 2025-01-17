require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Pastikan path sesuai
const dbMySQL = require('./config/db'); // Tambahkan koneksi database

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware untuk parsing JSON
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded data

// Routes
app.use('/api/users', userRoutes);

// Tes koneksi database
dbMySQL.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        console.error(err.stack); // Debugging tambahan
    } else {
        console.log('Connected to MySQL database gantara_db.');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
