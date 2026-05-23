const mongoose = require('mongoose');

const spellingTestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    userAnswer: {
      type: String,
    },
    correct: {
      type: Boolean,
      required: true,
    },
    mistakePattern: {
      type: String, // e.g., 'silent-e', 'double-consonant'
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SpellingTest', spellingTestSchema);
