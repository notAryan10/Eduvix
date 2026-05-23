const express = require('express');
const router = express.Router();
const { getGamificationProfile, addXPManually } = require('../controllers/gamificationController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getGamificationProfile);
router.post('/add-xp', protect, addXPManually);

module.exports = router;
