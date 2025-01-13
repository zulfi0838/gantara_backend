const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Pastikan path sesuai
const bcrypt = require('bcryptjs');

// Menambahkan user
router.post('/', (req, res) => {
  const { username, email, password, role } = req.body;

  // Debugging untuk melihat data yang diterima
  console.log(req.body);  // Tambahkan log ini

  // Validasi input
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Hash password sebelum menyimpan
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Query untuk menambahkan user ke database
  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, hashedPassword, role], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(201).json({ message: "User added successfully", userId: result.insertId });
  });
});

// Menampilkan daftar user
router.get('/', (req, res) => {
  const sql = 'SELECT id, username, email, role, created_at FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
