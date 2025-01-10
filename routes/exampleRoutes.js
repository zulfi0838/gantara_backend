const express = require('express');
const { getUsers, createUser } = require('../controllers/exampleController'); // Ganti dengan controller yang sesuai

const router = express.Router();  // Deklarasi router hanya sekali

// Menyambungkan route dengan controller
router.get('/', getUsers); // GET request untuk mengambil semua data pengguna
router.post('/', createUser); // POST request untuk menambah pengguna baru

module.exports = router;

