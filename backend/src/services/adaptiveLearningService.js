const axios = require('axios');
const memoryService = require('./memoryService');

const analyzeStudentPerformance = async (userId, quizResults) => {
  const profile = await memoryService.getLearningProfile(userId);
  const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

  try {
    const response = await axios.post(`${aiServiceUrl}/api/tutor/analyze-student`, {
      quiz_results: quizResults,
      current_profile: profile
    });

    if (response.data) {
      await memoryService.updateLearningProfile(userId, response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error analyzing student performance:', error.message);
    return null;
  }
};

const getTutorResponse = async (userId, query, sessionHistory = []) => {
  const profile = await memoryService.getLearningProfile(userId);
  const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

  try {
    const response = await axios.post(`${aiServiceUrl}/api/tutor/adaptive-teach`, {
      query,
      learning_profile: profile,
      session_history: sessionHistory
    });

    return response.data;
  } catch (error) {
    console.error('Error getting tutor response:', error.message);
    throw error;
  }
};

module.exports = {
  analyzeStudentPerformance,
  getTutorResponse,
};
