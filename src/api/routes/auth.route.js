const express = require('express');
const { register, login, logout } = require('../controllers/auth.controller');
const router = express.Router();
const User = require('../models/user.model');

// Register API
router.post('/register', register);

// Login API
router.post('/login', login);

// Logout API
router.post('/logout', logout);

module.exports = router;
