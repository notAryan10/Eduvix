const QuizAttempt = require('../models/QuizAttempt');
const LearningProfile = require('../models/LearningProfile');
const axios = require('axios');

// @desc    Generate AI quiz
// @route   POST /api/quiz/generate
// @access  Private
const generateQuiz = async (req, res) => {
  const { subject, difficulty } = req.body;

  try {
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    
    console.log(`Starting quiz generation for subject: ${subject}...`);
    
    const response = await axios.post(`${aiServiceUrl}/api/quiz/generate-quiz`, {
      subject,
      difficulty: difficulty || 'medium',
      num_questions: 5,
      user_id: req.user.id
    }, {
      timeout: 120000 // 2 minutes timeout for local LLM
    });

    res.status(200).json(response.data);
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Quiz generation TIMEOUT: The local LLM is taking too long.');
      return res.status(504).json({ message: 'The AI is taking too long to think. Please try again or check if your laptop is busy.' });
    }
    console.error('Quiz generation error details:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      message: error.response?.data?.detail || error.message || 'Failed to generate quiz' 
    });
  }
};

// @desc    Submit quiz answers
// @route   POST /api/quiz/submit
// @access  Private
const submitQuiz = async (req, res) => {
  const { subject, questions, score, timeTaken, difficulty } = req.body;
  const userId = req.user.id;

  try {
    // 1. Save quiz attempt
    const attempt = await QuizAttempt.create({
      user: userId,
      subject,
      questions,
      score,
      timeTaken,
      difficulty,
      weakTopics: questions.filter(q => !q.isCorrect).map(q => q.topic || subject)
    });

    // 2. Update Learning Profile (Learning Intelligence)
    let profile = await LearningProfile.findOne({ userId });
    
    if (!profile) {
      profile = await LearningProfile.create({ userId });
    }

    // Update weak topics scores
    const wrongQuestions = questions.filter(q => !q.isCorrect);
    wrongQuestions.forEach(q => {
      const topic = q.topic || subject;
      const existingTopic = profile.weakTopics.find(t => t.topic === topic);
      if (existingTopic) {
        existingTopic.score += 1;
      } else {
        profile.weakTopics.push({ topic, score: 1 });
      }
    });

    // Update average score
    const allAttempts = await QuizAttempt.find({ user: userId });
    const avgScore = allAttempts.reduce((acc, curr) => acc + curr.score, 0) / allAttempts.length;
    profile.averageScore = Math.round(avgScore);
    
    // Adaptive Difficulty logic
    if (profile.averageScore > 85) profile.preferredDifficulty = 'hard';
    else if (profile.averageScore < 50) profile.preferredDifficulty = 'easy';
    else profile.preferredDifficulty = 'medium';

    await profile.save();

    // 3. Trigger Adaptive Learning Analysis (Phase 4)
    const adaptiveLearningService = require('../services/adaptiveLearningService');
    await adaptiveLearningService.analyzeStudentPerformance(userId, {
      score,
      timeTaken,
      subject,
      questions
    });

    // 4. Add XP (Phase 5)
    const xpService = require('../services/xpService');
    const xpResult = await xpService.addXP(userId, 'QUIZ_COMPLETION');

    res.status(201).json({ attempt, profile, xp: xpResult });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  generateQuiz,
  submitQuiz,
};
