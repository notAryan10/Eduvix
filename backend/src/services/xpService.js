const XPProfile = require('../models/XPProfile');

const XP_MAP = {
  CORRECT_ANSWER: 10,
  QUIZ_COMPLETION: 25,
  DAILY_LOGIN: 5,
  REVISION_COMPLETION: 15,
  SPELLING_SUCCESS: 10,
};

const addXP = async (userId, source) => {
  const amount = XP_MAP[source] || 0;
  let profile = await XPProfile.findOne({ userId });
  
  if (!profile) {
    profile = await XPProfile.create({ userId });
  }

  profile.xp += amount;
  
  // Simple leveling: 100 XP per level
  const newLevel = Math.floor(profile.xp / 100) + 1;
  const leveledUp = newLevel > profile.level;
  profile.level = newLevel;

  await profile.save();
  return { xp: profile.xp, level: profile.level, leveledUp, added: amount };
};

const getXPProfile = async (userId) => {
  let profile = await XPProfile.findOne({ userId });
  if (!profile) {
    profile = await XPProfile.create({ userId });
  }
  return profile;
};

module.exports = {
  addXP,
  getXPProfile,
};
