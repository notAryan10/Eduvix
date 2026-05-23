const express = require('express');
const router = express.Router();
const { checkSpelling, getAdaptiveWords } = require('../controllers/spellingController');
const { protect } = require('../middleware/auth');

router.get('/words', protect, getAdaptiveWords);
router.post('/check', protect, checkSpelling);

module.exports = router;
