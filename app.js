const express = require('express');
const dotenv = require('dotenv');
const dbMySQL = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

// Tes koneksi database
dbMySQL.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database gantara_db.');
    }
});

// Ekspor handler untuk digunakan oleh Vercel
module.exports = app;
