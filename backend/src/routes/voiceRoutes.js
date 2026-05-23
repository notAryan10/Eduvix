const express = require('express');
const router = express.Router();
const { startVoiceSession, updateVoiceSession } = require('../controllers/voiceController');
const { protect } = require('../middleware/auth');

router.post('/start-session', protect, startVoiceSession);
router.put('/session/:id', protect, updateVoiceSession);

module.exports = router;
