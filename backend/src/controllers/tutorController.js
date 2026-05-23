const adaptiveLearningService = require('../services/adaptiveLearningService');
const TutorSession = require('../models/TutorSession');

// @desc    Chat with AI Tutor
// @route   POST /api/tutor/chat
// @access  Private
const chatWithTutor = async (req, res) => {
  const { query, sessionId, topic } = req.body;
  const userId = req.user.id;

  try {
    let session;
    if (sessionId) {
      session = await TutorSession.findById(sessionId);
    }

    const history = session ? session.messages.map(m => ({ role: m.role, content: m.content })) : [];
    
    const response = await adaptiveLearningService.getTutorResponse(userId, query, history);

    // Save message to session
    if (!session) {
      // Get current profile for teaching style and difficulty
      const memoryService = require('../services/memoryService');
      const profile = await memoryService.getLearningProfile(userId);
      
      session = await TutorSession.create({
        userId,
        topic: topic || 'General',
        difficulty: profile.preferredDifficulty,
        teachingStyle: profile.preferredTeachingStyle,
        messages: []
      });
    }

    session.messages.push({ role: 'user', content: query });
    session.messages.push({ role: 'assistant', content: response.answer });
    await session.save();

    res.status(200).json({
      answer: response.answer,
      sessionId: session._id,
      style: response.style_applied
    });
  } catch (error) {
    console.error('Tutor chat error:', error.message);
    res.status(500).json({ message: 'Failed to get tutor response' });
  }
};

// @desc    Get tutor sessions
// @route   GET /api/tutor/sessions
// @access  Private
const getSessions = async (req, res) => {
  try {
    const sessions = await TutorSession.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  chatWithTutor,
  getSessions,
};
