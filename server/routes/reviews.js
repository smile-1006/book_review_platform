const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// @route   GET /api/reviews
// @desc    Get all reviews for a book
// @access  Public
router.get('/', getReviews);

// @route   POST /api/reviews
// @desc    Submit a review (Authenticated users only)
// @access  Private
router.post('/', isAuth, createReview);

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private
router.put('/:id', isAuth, updateReview);

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', isAuth, deleteReview);

module.exports = router; 