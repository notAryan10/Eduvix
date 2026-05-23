const axios = require('axios');
const SpellingTest = require('../models/SpellingTest');
const memoryService = require('../services/memoryService');

// @desc    Generate adaptive spelling words
// @route   GET /api/spelling/words
// @access  Private
const getAdaptiveWords = async (req, res) => {
  const userId = req.user.id;
  const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

  try {
    const profile = await memoryService.getLearningProfile(userId);
    
    const response = await axios.post(`${aiServiceUrl}/api/tutor/generate-spelling`, {
      learning_profile: profile,
      num_words: 5
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error generating adaptive words:', error.message);
    // Fallback words
    res.status(200).json(["Photosynthesis", "Atmosphere", "Metamorphosis", "Ecosystem", "Velocity"]);
  }
};

// @desc    Check spelling and save result
// @route   POST /api/spelling/check
// @access  Private
const checkSpelling = async (req, res) => {
  const { word, userAnswer, difficulty } = req.body;
  const userId = req.user.id;

  const correct = word.toLowerCase().trim() === userAnswer.toLowerCase().trim();
  
  // Basic mistake pattern detection
  let mistakePattern = null;
  if (!correct) {
    if (word.endsWith('e') && !userAnswer.endsWith('e')) mistakePattern = 'silent-e';
  }

  try {
    const test = await SpellingTest.create({
      user: userId,
      word,
      userAnswer,
      correct,
      mistakePattern,
      difficulty: difficulty || 'medium'
    });

    res.status(201).json(test);
  } catch (error) {
    console.error('Spelling check error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAdaptiveWords,
  checkSpelling,
};
