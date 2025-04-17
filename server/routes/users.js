const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', getUserProfile);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', isAuth, updateUserProfile);

module.exports = router; 