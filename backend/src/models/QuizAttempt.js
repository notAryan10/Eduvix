const mongoose = require('mongoose');

const quizAttemptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        userAnswer: String,
        isCorrect: Boolean,
        explanation: String,
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number, // in seconds
    },
    weakTopics: [
      {
        type: String,
      },
    ],
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

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
