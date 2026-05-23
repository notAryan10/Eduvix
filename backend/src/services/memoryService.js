const LearningProfile = require('../models/LearningProfile');

const getLearningProfile = async (userId) => {
  let profile = await LearningProfile.findOne({ userId });
  if (!profile) {
    profile = await LearningProfile.create({ userId });
  }
  return profile;
};

const updateLearningProfile = async (userId, updates) => {
  const profile = await LearningProfile.findOneAndUpdate(
    { userId },
    { $set: { ...updates, lastActive: Date.now() } },
    { new: true, upsert: true }
  );
  return profile;
};

module.exports = {
  getLearningProfile,
  updateLearningProfile,
};
