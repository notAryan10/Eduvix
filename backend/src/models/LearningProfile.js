const mongoose = require('mongoose');

const learningProfileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    weakTopics: [
      {
        topic: String,
        score: { type: Number, default: 0 },
        lastTested: { type: Date, default: Date.now },
        consecutiveMistakes: { type: Number, default: 0 }
      },
    ],
    strongTopics: [String],
    readingLevel: {
      type: String,
      default: 'Beginner',
    },
    learningSpeed: {
      type: String,
      enum: ['slow', 'medium', 'fast'],
      default: 'medium'
    },
    preferredTeachingStyle: {
      type: String,
      enum: ['storytelling', 'visual', 'step-by-step', 'conversational', 'hint-based'],
      default: 'conversational'
    },
    attentionSpan: {
      type: Number, // in minutes
      default: 20
    },
    averageScore: {
      type: Number,
      default: 0,
    },
    preferredDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    revisionFrequency: {
      type: Number,
      default: 1, // in days
    },
    learningPatterns: {
      mistakeTypes: [String],
      preferredStudyTime: String,
      averageSessionDuration: Number
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LearningProfile', learningProfileSchema);
