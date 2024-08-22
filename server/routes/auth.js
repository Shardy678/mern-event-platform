const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { register, login, getUser } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register)

// @route   POST api/auth/login
// @desc    Authenticate user and get token
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], login);

// @route   GET api/auth
// @desc    Get logged in user
router.get('/', auth, getUser);

module.exports = router;
