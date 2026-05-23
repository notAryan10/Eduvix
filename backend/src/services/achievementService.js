const Achievement = require('../models/Achievement');
const xpService = require('./xpService');

const ACHIEVEMENTS = [
  { name: 'Math Master', description: 'Perfect score in a Math quiz', xpReward: 50, icon: 'calculator' },
  { name: 'Spelling Champion', description: 'Complete a spelling test with 100% accuracy', xpReward: 50, icon: 'book' },
  { name: 'Science Explorer', description: 'Complete 5 Science quizzes', xpReward: 100, icon: 'flask' },
  { name: '7-Day Streak', description: 'Study for 7 days in a row', xpReward: 200, icon: 'flame' },
  { name: 'Quick Learner', description: 'Complete a quiz in under 2 minutes', xpReward: 50, icon: 'zap' },
];

const unlockAchievement = async (userId, achievementName) => {
  const existing = await Achievement.findOne({ userId, achievementName });
  if (existing) return null;

  const meta = ACHIEVEMENTS.find(a => a.name === achievementName);
  if (!meta) return null;

  const achievement = await Achievement.create({
    userId,
    achievementName: meta.name,
    description: meta.description,
    xpReward: meta.xpReward,
    icon: meta.icon,
  });

  await xpService.addXP(userId, 'ACHIEVEMENT_UNLOCKED'); // Custom logic for achievement XP
  // Manually add the reward XP
  const profile = await xpService.getXPProfile(userId);
  profile.xp += meta.xpReward;
  await profile.save();

  return achievement;
};

const getAchievements = async (userId) => {
  return await Achievement.find({ userId });
};

module.exports = {
  unlockAchievement,
  getAchievements,
};
