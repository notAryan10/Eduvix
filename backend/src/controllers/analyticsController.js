const QuizAttempt = require('../models/QuizAttempt');
const SpellingTest = require('../models/SpellingTest');
const LearningProfile = require('../models/LearningProfile');

// @desc    Get student performance analytics
// @route   GET /api/analytics/performance
// @access  Private
const getPerformanceAnalytics = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await LearningProfile.findOne({ userId });
    const quizHistory = await QuizAttempt.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
    const spellingHistory = await SpellingTest.find({ user: userId }).sort({ createdAt: -1 }).limit(10);

    // Calculate accuracy trends
    const quizAccuracy = quizHistory.length > 0 
      ? Math.round(quizHistory.reduce((acc, q) => acc + q.score, 0) / quizHistory.length)
      : 0;

    const spellingAccuracy = spellingHistory.length > 0
      ? Math.round((spellingHistory.filter(s => s.correct).length / spellingHistory.length) * 100)
      : 0;

    res.status(200).json({
      profile: profile || { message: 'No learning profile yet.' },
      quizAccuracy,
      spellingAccuracy,
      recentQuizzes: quizHistory,
      recentSpellings: spellingHistory,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getPerformanceAnalytics,
};
