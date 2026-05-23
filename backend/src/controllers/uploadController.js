const UploadedPDF = require('../models/UploadedPDF');

// @desc    Upload PDF and save metadata
// @route   POST /api/upload
// @access  Private
const uploadPDF = async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  const { subject } = req.body;

  if (!subject) {
    res.status(400);
    throw new Error('Please add a subject');
  }

  const pdf = await UploadedPDF.create({
    filename: req.file.filename,
    subject,
    uploadedBy: req.user.id,
  });

  res.status(201).json(pdf);
};

module.exports = {
  uploadPDF,
};
