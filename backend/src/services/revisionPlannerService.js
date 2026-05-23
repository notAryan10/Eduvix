const axios = require('axios');
const RevisionPlan = require('../models/RevisionPlan');
const memoryService = require('./memoryService');

const generateRevisionPlan = async (userId) => {
  const profile = await memoryService.getLearningProfile(userId);
  const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

  try {
    const response = await axios.post(`${aiServiceUrl}/api/tutor/generate-revision`, {
      learning_profile: profile
    });

    const planData = response.data;
    
    // Save to database
    const revisionPlan = await RevisionPlan.create({
      userId,
      topics: planData.topics,
      scheduledDate: planData.scheduledDate,
      generatedAt: planData.generatedAt
    });

    return revisionPlan;
  } catch (error) {
    console.error('Error generating revision plan:', error.message);
    throw error;
  }
};

const getLatestRevisionPlan = async (userId) => {
  return await RevisionPlan.findOne({ userId }).sort({ generatedAt: -1 });
};

module.exports = {
  generateRevisionPlan,
  getLatestRevisionPlan,
};
