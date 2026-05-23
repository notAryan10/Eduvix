const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    achievementName: {
      type: String,
      required: true,
    },
    description: String,
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
    xpReward: {
      type: Number,
      default: 0,
    },
    icon: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Achievement', achievementSchema);
