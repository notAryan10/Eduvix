const express = require('express');
const router = express.Router();
const { chatWithTutor, getSessions } = require('../controllers/tutorController');
const { protect } = require('../middleware/auth');

router.post('/chat', protect, chatWithTutor);
router.get('/sessions', protect, getSessions);

module.exports = router;
