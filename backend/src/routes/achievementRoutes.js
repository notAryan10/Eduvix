const express = require('express');
const router = express.Router();
const { getAchievements, unlockAchievement } = require('../controllers/achievementController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAchievements);
router.post('/unlock', protect, unlockAchievement);

module.exports = router;
