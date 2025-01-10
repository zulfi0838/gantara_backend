const express = require('express');
const dotenv = require('dotenv');
const dbMySQL = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // pastikan path benar

dotenv.config();

const app = express();

// Middleware untuk parsing body JSON
app.use(express.json());

// Gunakan route untuk /api/users hanya sekali
app.use('/api/users', userRoutes);

// Tes koneksi database
dbMySQL.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database gantara_db.');
    }
});

// Jalankan server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
