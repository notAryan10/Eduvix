const VoiceSession = require('../models/VoiceSession');

// @desc    Start voice tutoring session
// @route   POST /api/voice/start-session
// @access  Private
const startVoiceSession = async (req, res) => {
  const { topic } = req.body;
  const userId = req.user.id;

  try {
    const session = await VoiceSession.create({
      userId,
      topic,
      transcript: []
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update voice session transcript
// @route   PUT /api/voice/session/:id
// @access  Private
const updateVoiceSession = async (req, res) => {
  const { role, content } = req.body;
  const { id } = req.params;

  try {
    const session = await VoiceSession.findById(id);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.transcript.push({ role, content });
    await session.save();

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  startVoiceSession,
  updateVoiceSession,
};
