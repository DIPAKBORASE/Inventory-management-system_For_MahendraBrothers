const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { register, login, logout } = require('../controllers/user');
const users_valid = require('../validations/users_validator');
const login_valid = require('../validations/login_validator');

router.post('/register', users_valid.saveValid(), register);
router.post('/login', login_valid.loginValid(), login);
router.post('/logout', protect, logout);

module.exports = router;
