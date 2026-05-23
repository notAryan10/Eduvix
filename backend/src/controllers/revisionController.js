const revisionPlannerService = require('../services/revisionPlannerService');

// @desc    Get personalized revision plan
// @route   GET /api/revision/plan
// @access  Private
const getPlan = async (req, res) => {
  try {
    let plan = await revisionPlannerService.getLatestRevisionPlan(req.user.id);
    
    // If no plan or plan is old, generate a new one
    if (!plan || (new Date() - new Date(plan.generatedAt) > 24 * 60 * 60 * 1000)) {
      plan = await revisionPlannerService.generateRevisionPlan(req.user.id);
    }
    
    res.status(200).json(plan);
  } catch (error) {
    console.error('Revision plan error:', error.message);
    res.status(500).json({ message: 'Failed to get revision plan' });
  }
};

// @desc    Force generate new revision plan
// @route   POST /api/revision/generate
// @access  Private
const generateNewPlan = async (req, res) => {
  try {
    const plan = await revisionPlannerService.generateRevisionPlan(req.user.id);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate revision plan' });
  }
};

module.exports = {
  getPlan,
  generateNewPlan,
};
