const mongoose = require('mongoose');

const revisionPlanSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topics: [
      {
        topic: String,
        priority: {
          type: String,
          enum: ['high', 'medium', 'low'],
          default: 'medium',
        },
        reason: String,
      },
    ],
    scheduledDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('RevisionPlan', revisionPlanSchema);
