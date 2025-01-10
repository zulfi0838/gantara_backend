const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config(); // Memuat konfigurasi dari file .env

// Buat koneksi ke database
const dbMySQL = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10,
});

// Tes koneksi
dbMySQL.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database gantara_db.');
    }
});

module.exports = dbMySQL;
