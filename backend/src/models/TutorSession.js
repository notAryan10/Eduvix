const mongoose = require('mongoose');

const tutorSessionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    teachingStyle: {
      type: String,
      enum: ['storytelling', 'visual', 'step-by-step', 'conversational', 'hint-based'],
      required: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ['user', 'assistant'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    studentPerformance: {
      comprehensionLevel: Number, // 0-100
      engagementLevel: Number, // 0-100
    },
    sessionSummary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TutorSession', tutorSessionSchema);
