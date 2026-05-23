const mongoose = require('mongoose');

const xpProfileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastLoginDate: {
      type: Date,
      default: Date.now,
    },
    badges: [
      {
        name: String,
        icon: String,
        unlockedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('XPProfile', xpProfileSchema);
