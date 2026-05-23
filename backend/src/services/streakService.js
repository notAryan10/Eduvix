const XPProfile = require('../models/XPProfile');

const updateStreak = async (userId) => {
  const profile = await XPProfile.findOne({ userId });
  if (!profile) return;

  const now = new Date();
  const lastLogin = new Date(profile.lastLoginDate);
  
  const diffTime = Math.abs(now - lastLogin);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    profile.currentStreak += 1;
    if (profile.currentStreak > profile.longestStreak) {
      profile.longestStreak = profile.currentStreak;
    }
  } else if (diffDays > 1) {
    // Streak broken
    profile.currentStreak = 1;
  } else if (profile.currentStreak === 0) {
    // First time
    profile.currentStreak = 1;
  }

  profile.lastLoginDate = now;
  await profile.save();
  return profile.currentStreak;
};

module.exports = {
  updateStreak,
};
