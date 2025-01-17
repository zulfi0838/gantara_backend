const db = require('../config/db');

// GET: Ambil semua data pengguna
exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM users'; // Query untuk tabel 'users'
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
};

// POST: Tambah pengguna baru
exports.createUser = (req, res) => {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Query untuk memasukkan data pengguna
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ id: result.insertId, name, email });
    });
};
