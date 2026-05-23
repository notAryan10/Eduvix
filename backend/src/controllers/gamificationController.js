const xpService = require('../services/xpService');
const streakService = require('../services/streakService');

// @desc    Get gamification profile
// @route   GET /api/gamification/profile
// @access  Private
const getGamificationProfile = async (req, res) => {
  try {
    const profile = await xpService.getXPProfile(req.user.id);
    const streak = await streakService.updateStreak(req.user.id);
    
    res.status(200).json({
      ...profile.toObject(),
      currentStreak: streak
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add XP manually (e.g. from frontend events)
// @route   POST /api/gamification/add-xp
// @access  Private
const addXPManually = async (req, res) => {
  const { source } = req.body;
  try {
    const result = await xpService.addXP(req.user.id, source);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getGamificationProfile,
  addXPManually,
};
