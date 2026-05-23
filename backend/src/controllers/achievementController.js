const achievementService = require('../services/achievementService');

// @desc    Get user achievements
// @route   GET /api/achievement
// @access  Private
const getAchievements = async (req, res) => {
  try {
    const achievements = await achievementService.getAchievements(req.user.id);
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Unlock achievement
// @route   POST /api/achievement/unlock
// @access  Private
const unlockAchievement = async (req, res) => {
  const { achievementName } = req.body;
  try {
    const achievement = await achievementService.unlockAchievement(req.user.id, achievementName);
    if (!achievement) return res.status(400).json({ message: 'Already unlocked or invalid' });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAchievements,
  unlockAchievement,
};
