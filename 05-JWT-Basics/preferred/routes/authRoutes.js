const express = require('express');
const router = express.Router();

// Importing controller functions
const { logon, hello } = require('../controllers/authController');

// Importing middleware for authentication
const authenticate = require('../middleware/authenticate');

// Route for user logon
router.post('/logon', logon);

// Protected route
router.get('/hello', authenticate, hello);

module.exports = router;