const mongoose = require('mongoose');

const quizAttemptSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    weakTopics: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
