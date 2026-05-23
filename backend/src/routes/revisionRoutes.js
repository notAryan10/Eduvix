const express = require('express');
const router = express.Router();
const { getPlan, generateNewPlan } = require('../controllers/revisionController');
const { protect } = require('../middleware/auth');

router.get('/plan', protect, getPlan);
router.post('/generate', protect, generateNewPlan);

module.exports = router;
