const express = require('express');
const router = express.Router();
const { generateQuiz, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, generateQuiz);
router.post('/submit', protect, submitQuiz);

module.exports = router;
