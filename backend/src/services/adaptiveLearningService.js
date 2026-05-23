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
    console.log(`Sending request to AI Service at: ${aiServiceUrl}/api/tutor/adaptive-teach`);
    const response = await axios.post(`${aiServiceUrl}/api/tutor/adaptive-teach`, {
      query,
      learning_profile: profile,
      session_history: sessionHistory
    }, {
      timeout: 30000 // 30 seconds timeout
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('AI Service Error Data:', error.response.data);
      console.error('AI Service Error Status:', error.response.status);
    } else if (error.request) {
      console.error('AI Service No Response:', error.request);
    } else {
      console.error('AI Service Request Setup Error:', error.message);
    }
    throw error;
  }
};

module.exports = {
  analyzeStudentPerformance,
  getTutorResponse,
};
