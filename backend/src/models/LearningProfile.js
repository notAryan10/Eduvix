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
      },
    ],
    strongTopics: [String],
    readingLevel: {
      type: String,
      default: 'Beginner',
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
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LearningProfile', learningProfileSchema);
