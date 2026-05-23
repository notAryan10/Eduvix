const express = require('express');
const router = express.Router();
const { generateQuiz, submitQuiz } = require('../controllers/quizController');
const { getQuizAttempt } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, generateQuiz);
router.post('/submit', protect, submitQuiz);
router.get('/attempt/:id', protect, getQuizAttempt);

module.exports = router;
