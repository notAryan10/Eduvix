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

    // Calculate real stats
    const totalQuizzes = quizAttempts.length;
    const avgScore = totalQuizzes > 0 
      ? Math.round(quizAttempts.reduce((acc, q) => acc + q.score, 0) / totalQuizzes) 
      : 0;

    // Calculate daily progress (Today's activities / Daily Goal)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysQuizzes = await QuizAttempt.countDocuments({ 
      user: userId, 
      createdAt: { $gte: today } 
    });
    const todaysSpellings = await SpellingTest.countDocuments({ 
      user: userId, 
      createdAt: { $gte: today } 
    });
    
    const dailyGoal = 5;
    const activitiesCompleted = todaysQuizzes + todaysSpellings;
    const progressPercent = Math.min(Math.round((activitiesCompleted / dailyGoal) * 100), 100);

    // Calculate total study time
    const totalSeconds = quizAttempts.reduce((acc, q) => acc + (q.timeTaken || 0), 0);
    const studyTimeStr = totalSeconds < 3600 
      ? `${Math.round(totalSeconds / 60)}m` 
      : `${(totalSeconds / 3600).toFixed(1)}h`;

    res.json({
      user: {
        name: user.name,
        grade: user.grade,
      },
      stats: {
        dailyProgress: `${progressPercent}%`,
        studyTime: studyTimeStr,
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
