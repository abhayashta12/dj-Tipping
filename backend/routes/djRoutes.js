const express = require('express');
const { registerDJ, loginDJ, updateDJStatus } = require('../controllers/djController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// DJ registration route
router.post('/register', registerDJ);

// DJ login route
router.post('/login', loginDJ);

// Update DJ status (protected route)
router.put('/status', authMiddleware, updateDJStatus);

module.exports = router;
