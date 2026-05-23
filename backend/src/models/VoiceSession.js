const mongoose = require('mongoose');

const voiceSessionSchema = mongoose.Schema(
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
    duration: {
      type: Number, // in seconds
      default: 0,
    },
    transcript: [
      {
        role: String,
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('VoiceSession', voiceSessionSchema);
