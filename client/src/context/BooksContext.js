import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { booksAPI } from '../services/api';

// Create context
const BooksContext = createContext();

// Initial state
const initialState = {
  books: [],
  currentBook: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  filters: {
    search: '',
    genre: 'all',
    minRating: 0,
  },
};

// Action types
const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';
const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST';
const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
const FETCH_BOOK_ERROR = 'FETCH_BOOK_ERROR';
const SET_FILTERS = 'SET_FILTERS';
const CLEAR_ERROR = 'CLEAR_ERROR';

// Reducer
const booksReducer = (state, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books,
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case FETCH_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        currentBook: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_BOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Provider component
export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  // Fetch books with pagination and filters
  const fetchBooks = async (page = 1, limit = 10) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
      const { search, genre, minRating } = state.filters;
      const params = {
        page,
        limit,
        search,
        genre: genre !== 'all' ? genre : undefined,
        minRating: minRating > 0 ? minRating : undefined,
      };
      
      const response = await booksAPI.searchBooks(params);
      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        payload: {
          books: response.data.books,
          pagination: {
            page: response.data.page,
            limit: response.data.limit,
            total: response.data.total,
          },
        },
      });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_ERROR, payload: error.response?.data?.message || 'Failed to fetch books' });
      throw error;
    }
  };

  // Fetch a single book by ID
  const fetchBook = async (id) => {
    dispatch({ type: FETCH_BOOK_REQUEST });
    try {
      const response = await booksAPI.getBook(id);
      dispatch({ type: FETCH_BOOK_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_BOOK_ERROR, payload: error.response?.data?.message || 'Failed to fetch book' });
      throw error;
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <BooksContext.Provider
      value={{
        books: state.books,
        currentBook: state.currentBook,
        loading: state.loading,
        error: state.error,
        pagination: state.pagination,
        filters: state.filters,
        fetchBooks,
        fetchBook,
        setFilters,
        clearError,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

// Custom hook to use books context
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};

export default BooksContext; 