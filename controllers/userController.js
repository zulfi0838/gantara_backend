const dbMySQL = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Fungsi untuk menambahkan user
const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validasi input
    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'Semua kolom harus diisi!' });
    }

    try {
        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Query untuk menambahkan user
        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        const values = [username, email, hashedPassword, role];

        const [results] = await dbMySQL.promise().execute(query, values);

        res.status(201).json({ message: 'User berhasil ditambahkan!', data: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data!' });
    }
};

// Fungsi untuk mengambil semua user
const getUsers = async (req, res) => {
    try {
        const query = 'SELECT id, username, email, role, created_at FROM users';
        const [results] = await dbMySQL.promise().execute(query);

        res.status(200).json({ data: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data!' });
    }
};

// Fungsi login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email dan password harus diisi!' });
    }

    try {
        // Cek apakah user ada di database
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await dbMySQL.promise().execute(query, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Email tidak ditemukan!' });
        }

        const user = rows[0];

        // Bandingkan password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Password salah!' });
        }

        // Buat JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Terjadi kesalahan pada server!' });
    }
};

// Ekspor fungsi-fungsi
module.exports = { createUser, getUsers, login };