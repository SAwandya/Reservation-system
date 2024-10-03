const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route   POST /api/feedback
// @desc    Save feedback to the database
router.post('/', async (req, res) => {
  const { name, email, message, rating } = req.body;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    // Create a new feedback document
    const feedback = new Feedback({
      name,
      email,
      message,
      rating,
    });

    // Save to the database
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
