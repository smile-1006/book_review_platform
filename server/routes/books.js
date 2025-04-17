const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middleware/auth');
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// @route   GET /api/books
// @desc    Get paginated list of books
// @access  Public
router.get('/', getBooks);

// @route   GET /api/books/:id
// @desc    Get single book with its reviews
// @access  Public
router.get('/:id', getBookById);

// @route   POST /api/books
// @desc    Add a new book (Admin only)
// @access  Private/Admin
router.post('/', [isAuth, isAdmin], createBook);

// @route   PUT /api/books/:id
// @desc    Update a book (Admin only)
// @access  Private/Admin
router.put('/:id', [isAuth, isAdmin], updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete a book (Admin only)
// @access  Private/Admin
router.delete('/:id', [isAuth, isAdmin], deleteBook);

module.exports = router; 