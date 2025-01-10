const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // pastikan path benar

// Rute untuk menambahkan user (POST)
router.post('/', userController.createUser);

// Rute untuk mendapatkan daftar user (GET)
router.get('/', userController.getUsers);

module.exports = router;
