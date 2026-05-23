const QuizAttempt = require('../models/QuizAttempt');

// @desc    Get a single quiz attempt by ID
// @route   GET /api/quiz/attempt/:id
// @access  Private
const getQuizAttempt = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({ message: 'Quiz attempt not found' });
    }

    // Ensure the user owns this attempt
    if (attempt.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json(attempt);
  } catch (error) {
    console.error('Get quiz attempt error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getQuizAttempt,
};
