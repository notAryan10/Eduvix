const UploadedPDF = require('../models/UploadedPDF');
const SpellingTest = require('../models/SpellingTest');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user info
    const user = await User.findById(userId).select('-password');

    // Fetch recent materials (PDFs)
    const recentPDFs = await UploadedPDF.find({ uploadedBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch recent quiz attempts
    const recentQuizzes = await QuizAttempt.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch weak topics (summarized from quiz attempts)
    const quizAttempts = await QuizAttempt.find({ user: userId });
    const weakTopicsMap = {};
    quizAttempts.forEach(attempt => {
      attempt.weakTopics.forEach(topic => {
        weakTopicsMap[topic] = (weakTopicsMap[topic] || 0) + 1;
      });
    });
    
    const weakTopics = Object.entries(weakTopicsMap)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Calculate some stats (placeholders for now if data is missing)
    const totalQuizzes = quizAttempts.length;
    const avgScore = totalQuizzes > 0 
      ? Math.round(quizAttempts.reduce((acc, q) => acc + q.score, 0) / totalQuizzes) 
      : 0;

    res.json({
      user: {
        name: user.name,
        grade: user.grade,
      },
      stats: {
        dailyProgress: "75%", // Placeholder for now
        studyTime: "1.2h",    // Placeholder for now
        topicsMastered: totalQuizzes,
        avgScore: `${avgScore}%`,
      },
      recentMaterials: recentPDFs,
      recentQuizzes,
      weakTopics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getDashboardData,
};
