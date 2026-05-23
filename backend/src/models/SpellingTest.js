const mongoose = require('mongoose');

const spellingTestSchema = mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model('SpellingTest', spellingTestSchema);
