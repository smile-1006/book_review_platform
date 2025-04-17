import React, { createContext, useContext, useReducer } from 'react';
import { reviewsAPI } from '../services/api';

// Create context
const ReviewsContext = createContext();

// Initial state
const initialState = {
  reviews: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Action types
const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
const FETCH_REVIEWS_ERROR = 'FETCH_REVIEWS_ERROR';
const ADD_REVIEW_REQUEST = 'ADD_REVIEW_REQUEST';
const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
const ADD_REVIEW_ERROR = 'ADD_REVIEW_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

// Reducer
const reviewsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload.reviews,
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case FETCH_REVIEWS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
        loading: false,
        error: null,
      };
    case ADD_REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
export const ReviewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  // Fetch reviews for a book
  const fetchReviews = async (bookId, page = 1, limit = 10) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });
    try {
      const response = await reviewsAPI.getBookReviews(bookId, { page, limit });
      dispatch({
        type: FETCH_REVIEWS_SUCCESS,
        payload: {
          reviews: response.data.reviews,
          pagination: {
            page: response.data.page,
            limit: response.data.limit,
            total: response.data.total,
          },
        },
      });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_REVIEWS_ERROR, payload: error.response?.data?.message || 'Failed to fetch reviews' });
      throw error;
    }
  };

  // Add a new review
  const addReview = async (reviewData) => {
    dispatch({ type: ADD_REVIEW_REQUEST });
    try {
      const response = await reviewsAPI.createReview(reviewData);
      dispatch({ type: ADD_REVIEW_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: ADD_REVIEW_ERROR, payload: error.response?.data?.message || 'Failed to add review' });
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews: state.reviews,
        loading: state.loading,
        error: state.error,
        pagination: state.pagination,
        fetchReviews,
        addReview,
        clearError,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

// Custom hook to use reviews context
export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export default ReviewsContext; 