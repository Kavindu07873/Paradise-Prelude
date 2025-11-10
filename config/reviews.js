// Centralized review management for Paradise Prelude
// Now uses Firebase Firestore for persistent storage across devices

import { getAllReviews as getFirestoreReviews, addReview as addFirestoreReview, deleteReview as deleteFirestoreReview, updateReview as updateFirestoreReview } from '../services/firebaseService';

// Default reviews (these will be shown initially if no reviews in Firestore)
const defaultReviews = [
  {
    id: 1,
    name: 'Emily R.',
    text: 'A truly magical stay! The villa is stunning, the staff attentive, and the location perfect for exploring the southern coast.',
    rating: 5,
    date: '2024-01-15',
    verified: true,
  },
  {
    id: 2,
    name: 'Liam S.',
    text: 'We loved the infinity pool and the ocean views. Every detail was perfect. Highly recommended!',
    rating: 5,
    date: '2024-01-10',
    verified: true,
  },
  {
    id: 3,
    name: 'Sofia D.',
    text: 'The most relaxing holiday we have ever had. The garden and spa are a dream. Will return!',
    rating: 5,
    date: '2024-01-08',
    verified: true,
  },
  {
    id: 4,
    name: 'Arjun K.',
    text: 'Great location, clean and safe with some Nice natural attractions. Just 10 min from the beach, very easy to find family and better based on the amenities.',
    rating: 4,
    date: '2024-01-05',
    verified: true,
  },
  {
    id: 5,
    name: 'Chai, France',
    text: 'Lovely and quiet. Well located. Happy return. Very unique. Perfectly clean. All green property, everything in one place.',
    rating: 5,
    date: '2024-01-03',
    verified: true,
  },
  {
    id: 6,
    name: 'Deepu, Singapore',
    text: 'Amazing resort. Beautiful, serene, and lovely hospitality. The views are out of a novel, and the swimming pool. You feel isolated from the ocean but simultaneously safe. Will return to visit again.',
    rating: 5,
    date: '2024-01-01',
    verified: true,
  },
];

// Cache for reviews to avoid multiple Firebase calls
let reviewsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 30000; // 30 seconds

/**
 * Get all reviews from Firestore or cache
 * @returns {Promise<Array>} - Array of reviews
 */
export const getAllReviews = async () => {
  try {
    // Check cache first
    if (reviewsCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
      return reviewsCache;
    }
    
    // Get reviews from Firestore
    const firestoreReviews = await getFirestoreReviews();
    
    // If no reviews in Firestore, return default reviews
    if (firestoreReviews.length === 0) {
      reviewsCache = defaultReviews;
      cacheTimestamp = Date.now();
      return defaultReviews;
    }
    
    // Cache the reviews
    reviewsCache = firestoreReviews;
    cacheTimestamp = Date.now();
    
    return firestoreReviews;
  } catch (error) {
    console.error('Error loading reviews from Firestore:', error);
    // Fallback to default reviews on error
    return defaultReviews;
  }
};

/**
 * Invalidate reviews cache
 */
const invalidateCache = () => {
  reviewsCache = null;
  cacheTimestamp = null;
};

/**
 * Add a new review
 * @param {Object} reviewData - Review data
 * @returns {Promise<Object>} - New review object
 */
export const addReview = async (reviewData) => {
  try {
    // Validate review data
    if (!reviewData.name || !reviewData.text || !reviewData.rating) {
      throw new Error('Invalid review data');
    }
    
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    
    // Add review to Firestore
    const newReview = await addFirestoreReview(reviewData);
    
    // Invalidate cache
    invalidateCache();
    
    return newReview;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

/**
 * Get reviews for preview (first few reviews)
 * @param {number} count - Number of reviews to return
 * @returns {Promise<Array>} - Array of reviews
 */
export const getReviewsPreview = async (count = 3) => {
  const reviews = await getAllReviews();
  return reviews.slice(0, count);
};

/**
 * Get all reviews for the reviews page
 * @returns {Promise<Array>} - Array of all reviews
 */
export const getReviewsForPage = async () => {
  return await getAllReviews();
};

/**
 * Get reviews by rating
 * @param {number} rating - Rating to filter by
 * @returns {Promise<Array>} - Array of reviews with specified rating
 */
export const getReviewsByRating = async (rating) => {
  const reviews = await getAllReviews();
  return reviews.filter(review => review.rating === rating);
};

/**
 * Get average rating
 * @returns {Promise<number>} - Average rating
 */
export const getAverageRating = async () => {
  const reviews = await getAllReviews();
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / reviews.length) * 10) / 10; // Round to 1 decimal place
};

/**
 * Get rating distribution
 * @returns {Promise<Object>} - Rating distribution object
 */
export const getRatingDistribution = async () => {
  const reviews = await getAllReviews();
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1;
  });
  
  return distribution;
};

/**
 * Delete a review (admin function)
 * @param {string} reviewId - Review ID to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteReview = async (reviewId) => {
  try {
    const success = await deleteFirestoreReview(reviewId);
    if (success) {
      invalidateCache();
    }
    return success;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
};

/**
 * Update a review (admin function)
 * @param {string} reviewId - Review ID to update
 * @param {Object} updates - Updates to apply
 * @returns {Promise<boolean>} - Success status
 */
export const updateReview = async (reviewId, updates) => {
  try {
    const success = await updateFirestoreReview(reviewId, updates);
    if (success) {
      invalidateCache();
    }
    return success;
  } catch (error) {
    console.error('Error updating review:', error);
    return false;
  }
};

// Export default reviews for reference
export { defaultReviews };

// Default export with all functions
export default {
  getAllReviews,
  addReview,
  getReviewsPreview,
  getReviewsForPage,
  getReviewsByRating,
  getAverageRating,
  getRatingDistribution,
  deleteReview,
  updateReview,
  defaultReviews,
};
