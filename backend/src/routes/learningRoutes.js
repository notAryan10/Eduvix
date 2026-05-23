const express = require('express');
const router = express.Router();
const { getProfile, updatePreferences } = require('../controllers/learningController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.put('/preferences', protect, updatePreferences);

module.exports = router;
