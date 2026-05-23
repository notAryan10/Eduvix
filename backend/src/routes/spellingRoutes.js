const express = require('express');
const router = express.Router();
const { checkSpelling } = require('../controllers/spellingController');
const { protect } = require('../middleware/auth');

router.post('/check', protect, checkSpelling);

module.exports = router;
