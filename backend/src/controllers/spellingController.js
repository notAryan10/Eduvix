const SpellingTest = require('../models/SpellingTest');

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
    // More complex patterns can be added here or via AI service
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
  checkSpelling,
};
