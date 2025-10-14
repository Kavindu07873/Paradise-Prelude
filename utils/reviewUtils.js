// Review utility functions for Paradise Prelude
// This file provides helper functions for managing reviews across the application

import { 
  getAllReviews, 
  getReviewsPreview, 
  getReviewsForPage, 
  getReviewsByRating, 
  getAverageRating, 
  getRatingDistribution,
  addReview,
  deleteReview,
  updateReview 
} from '../config/reviews';

/**
 * Get reviews formatted for display
 * @param {number} limit - Maximum number of reviews to return
 * @returns {Array} - Array of formatted reviews
 */
export const getFormattedReviews = (limit = null) => {
  const reviews = getAllReviews();
  const formattedReviews = reviews.map(review => ({
    ...review,
    formattedDate: formatDate(review.date),
    ratingText: getRatingText(review.rating),
    initials: getInitials(review.name),
  }));
  
  return limit ? formattedReviews.slice(0, limit) : formattedReviews;
};

/**
 * Format date for display
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get rating text description
 * @param {number} rating - Rating from 1-5
 * @returns {string} - Rating description
 */
export const getRatingText = (rating) => {
  const ratingTexts = {
    5: 'Excellent',
    4: 'Very Good',
    3: 'Good',
    2: 'Fair',
    1: 'Poor'
  };
  return ratingTexts[rating] || 'Unknown';
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

/**
 * Get reviews for home page preview
 * @param {number} count - Number of reviews to return
 * @returns {Array} - Array of formatted reviews
 */
export const getHomePageReviews = (count = 6) => {
  return getFormattedReviews(count);
};

/**
 * Get reviews for reviews page
 * @returns {Array} - Array of all formatted reviews
 */
export const getReviewsPageReviews = () => {
  return getFormattedReviews();
};

/**
 * Get review statistics
 * @returns {Object} - Review statistics object
 */
export const getReviewStats = () => {
  const reviews = getAllReviews();
  const averageRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();
  
  return {
    totalReviews: reviews.length,
    averageRating: averageRating,
    ratingDistribution: ratingDistribution,
    percentageByRating: Object.keys(ratingDistribution).reduce((acc, rating) => {
      acc[rating] = reviews.length > 0 ? Math.round((ratingDistribution[rating] / reviews.length) * 100) : 0;
      return acc;
    }, {}),
    recentReviews: reviews.slice(0, 3).map(review => ({
      ...review,
      formattedDate: formatDate(review.date),
      ratingText: getRatingText(review.rating),
    }))
  };
};

/**
 * Validate review data
 * @param {Object} reviewData - Review data to validate
 * @returns {Object} - Validation result
 */
export const validateReview = (reviewData) => {
  const errors = [];
  
  if (!reviewData.name || reviewData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!reviewData.text || reviewData.text.trim().length < 10) {
    errors.push('Review must be at least 10 characters long');
  }
  
  if (reviewData.text && reviewData.text.trim().length > 500) {
    errors.push('Review must be less than 500 characters');
  }
  
  if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
    errors.push('Rating must be between 1 and 5 stars');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Submit a new review
 * @param {Object} reviewData - Review data
 * @returns {Object} - Result object
 */
export const submitReview = (reviewData) => {
  const validation = validateReview(reviewData);
  
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors
    };
  }
  
  try {
    const newReview = addReview(reviewData);
    return {
      success: true,
      review: {
        ...newReview,
        formattedDate: formatDate(newReview.date),
        ratingText: getRatingText(newReview.rating),
        initials: getInitials(newReview.name),
      }
    };
  } catch (error) {
    return {
      success: false,
      errors: [error.message]
    };
  }
};

/**
 * Get reviews by date range
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Array} - Array of reviews in date range
 */
export const getReviewsByDateRange = (startDate, endDate) => {
  const reviews = getAllReviews();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return reviews.filter(review => {
    const reviewDate = new Date(review.date);
    return reviewDate >= start && reviewDate <= end;
  });
};

/**
 * Get recent reviews
 * @param {number} days - Number of recent days
 * @returns {Array} - Array of recent reviews
 */
export const getRecentReviews = (days = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const reviews = getAllReviews();
  return reviews.filter(review => new Date(review.date) >= cutoffDate);
};

/**
 * Search reviews by text
 * @param {string} searchTerm - Search term
 * @returns {Array} - Array of matching reviews
 */
export const searchReviews = (searchTerm) => {
  const reviews = getAllReviews();
  const term = searchTerm.toLowerCase();
  
  return reviews.filter(review => 
    review.name.toLowerCase().includes(term) ||
    review.text.toLowerCase().includes(term)
  );
};

/**
 * Get top rated reviews
 * @param {number} count - Number of top reviews to return
 * @returns {Array} - Array of top rated reviews
 */
export const getTopRatedReviews = (count = 5) => {
  const reviews = getAllReviews();
  return reviews
    .filter(review => review.rating === 5)
    .slice(0, count)
    .map(review => ({
      ...review,
      formattedDate: formatDate(review.date),
      ratingText: getRatingText(review.rating),
      initials: getInitials(review.name),
    }));
};

// Default export with all utility functions
export default {
  getFormattedReviews,
  formatDate,
  getRatingText,
  getInitials,
  getHomePageReviews,
  getReviewsPageReviews,
  getReviewStats,
  validateReview,
  submitReview,
  getReviewsByDateRange,
  getRecentReviews,
  searchReviews,
  getTopRatedReviews,
};
