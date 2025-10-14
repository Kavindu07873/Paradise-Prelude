// Centralized review management for Paradise Prelude
// This file manages all reviews used across the application

// Default reviews (these will be shown initially)
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

// Storage key for localStorage
const STORAGE_KEY = 'paradise_prelude_reviews';

// Get all reviews from localStorage or return default reviews
export const getAllReviews = () => {
  try {
    const storedReviews = localStorage.getItem(STORAGE_KEY);
    if (storedReviews) {
      return JSON.parse(storedReviews);
    }
  } catch (error) {
    console.error('Error loading reviews from localStorage:', error);
  }
  return defaultReviews;
};

// Save reviews to localStorage
const saveReviews = (reviews) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (error) {
    console.error('Error saving reviews to localStorage:', error);
  }
};

// Add a new review
export const addReview = (reviewData) => {
  const reviews = getAllReviews();
  const newReview = {
    id: Date.now(), // Simple ID generation
    name: reviewData.name.trim(),
    text: reviewData.text.trim(),
    rating: parseInt(reviewData.rating),
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    verified: false, // New reviews are not verified by default
  };

  // Validate review data
  if (!newReview.name || !newReview.text || newReview.rating < 1 || newReview.rating > 5) {
    throw new Error('Invalid review data');
  }

  // Add to beginning of array (newest first)
  const updatedReviews = [newReview, ...reviews];
  saveReviews(updatedReviews);
  return newReview;
};

// Get reviews for preview (first few reviews)
export const getReviewsPreview = (count = 3) => {
  const reviews = getAllReviews();
  return reviews.slice(0, count);
};

// Get all reviews for the reviews page
export const getReviewsForPage = () => {
  return getAllReviews();
};

// Get reviews by rating
export const getReviewsByRating = (rating) => {
  const reviews = getAllReviews();
  return reviews.filter(review => review.rating === rating);
};

// Get average rating
export const getAverageRating = () => {
  const reviews = getAllReviews();
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / reviews.length) * 10) / 10; // Round to 1 decimal place
};

// Get rating distribution
export const getRatingDistribution = () => {
  const reviews = getAllReviews();
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    distribution[review.rating]++;
  });
  
  return distribution;
};

// Delete a review (admin function)
export const deleteReview = (reviewId) => {
  const reviews = getAllReviews();
  const updatedReviews = reviews.filter(review => review.id !== reviewId);
  saveReviews(updatedReviews);
  return updatedReviews;
};

// Update a review (admin function)
export const updateReview = (reviewId, updates) => {
  const reviews = getAllReviews();
  const updatedReviews = reviews.map(review => 
    review.id === reviewId ? { ...review, ...updates } : review
  );
  saveReviews(updatedReviews);
  return updatedReviews;
};

// Reset to default reviews (admin function)
export const resetToDefaultReviews = () => {
  saveReviews(defaultReviews);
  return defaultReviews;
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
  resetToDefaultReviews,
  defaultReviews,
};
