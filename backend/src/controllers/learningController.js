const memoryService = require('../services/memoryService');

// @desc    Get student learning profile
// @route   GET /api/learning/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const profile = await memoryService.getLearningProfile(req.user.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update learning preferences
// @route   PUT /api/learning/preferences
// @access  Private
const updatePreferences = async (req, res) => {
  const { preferredTeachingStyle, readingLevel } = req.body;
  try {
    const profile = await memoryService.updateLearningProfile(req.user.id, {
      preferredTeachingStyle,
      readingLevel
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProfile,
  updatePreferences,
};
