const mongoose = require('mongoose');

const uploadedPDFSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UploadedPDF', uploadedPDFSchema);
