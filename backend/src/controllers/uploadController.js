const UploadedPDF = require('../models/UploadedPDF');
const axios = require('axios');
const path = require('path');

// @desc    Upload PDF and save metadata
// @route   POST /api/upload
// @access  Private
const uploadPDF = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const { subject } = req.body;

  if (!subject) {
    return res.status(400).json({ message: 'Please add a subject' });
  }

  try {
    const pdf = await UploadedPDF.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      subject,
      uploadedBy: req.user.id,
    });

    // Notify AI service to process the PDF by forwarding the file
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    const FormData = require('form-data');
    const fs = require('fs');

    const form = new FormData();
    form.append('user_id', req.user.id);
    form.append('file', fs.createReadStream(req.file.path));

    axios.post(`${aiServiceUrl}/api/rag/process-pdf`, form, {
      headers: {
        ...form.getHeaders()
      }
    }).catch(err => {
      console.error('AI Service processing error:', err.response?.data || err.message);
    });

    res.status(201).json(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  uploadPDF,
};
