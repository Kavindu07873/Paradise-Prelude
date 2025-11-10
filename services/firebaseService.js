// Firebase Firestore service for Paradise Prelude
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  getDocs,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Collection names
const COLLECTIONS = {
  ENGAGEMENT: 'engagement',
  REVIEWS: 'reviews',
  VIEWS: 'views',
};

/**
 * Get engagement data (views, likes)
 */
export const getEngagementData = async () => {
  try {
    const docRef = doc(db, COLLECTIONS.ENGAGEMENT, 'stats');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Initialize with default values
      const defaultData = {
        totalViews: 0,
        totalLikes: 0,
        lastUpdated: serverTimestamp(),
      };
      await setDoc(docRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error getting engagement data:', error);
    return { totalViews: 0, totalLikes: 0 };
  }
};

/**
 * Increment view count
 */
export const incrementViews = async () => {
  try {
    const docRef = doc(db, COLLECTIONS.ENGAGEMENT, 'stats');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        totalViews: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } else {
      await setDoc(docRef, {
        totalViews: 1,
        totalLikes: 0,
        lastUpdated: serverTimestamp(),
      });
    }
    
    const updated = await getDoc(docRef);
    return updated.data().totalViews;
  } catch (error) {
    console.error('Error incrementing views:', error);
    return 0;
  }
};

/**
 * Increment like count
 */
export const incrementLikes = async () => {
  try {
    const docRef = doc(db, COLLECTIONS.ENGAGEMENT, 'stats');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        totalLikes: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } else {
      await setDoc(docRef, {
        totalViews: 0,
        totalLikes: 1,
        lastUpdated: serverTimestamp(),
      });
    }
    
    const updated = await getDoc(docRef);
    return updated.data().totalLikes;
  } catch (error) {
    console.error('Error incrementing likes:', error);
    return 0;
  }
};

/**
 * Decrement like count
 */
export const decrementLikes = async () => {
  try {
    const docRef = doc(db, COLLECTIONS.ENGAGEMENT, 'stats');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentLikes = docSnap.data().totalLikes || 0;
      if (currentLikes > 0) {
        await updateDoc(docRef, {
          totalLikes: increment(-1),
          lastUpdated: serverTimestamp(),
        });
      }
    }
    
    const updated = await getDoc(docRef);
    return updated.data().totalLikes || 0;
  } catch (error) {
    console.error('Error decrementing likes:', error);
    return 0;
  }
};

/**
 * Check if user has liked (using localStorage for client-side check)
 */
export const hasUserLiked = () => {
  try {
    return localStorage.getItem('paradise_prelude_user_liked') === 'true';
  } catch (error) {
    return false;
  }
};

/**
 * Set user liked status
 */
export const setUserLiked = (liked) => {
  try {
    localStorage.setItem('paradise_prelude_user_liked', liked ? 'true' : 'false');
  } catch (error) {
    console.error('Error setting user liked status:', error);
  }
};

/**
 * Get all reviews from Firestore
 */
export const getAllReviews = async () => {
  try {
    const reviewsRef = collection(db, COLLECTIONS.REVIEWS);
    // Order by createdAt timestamp if available, otherwise by date
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const reviews = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Convert Firestore timestamp to date string if needed
      let dateStr = data.date;
      if (data.createdAt && data.createdAt.toDate) {
        dateStr = data.createdAt.toDate().toISOString().split('T')[0];
      }
      
      reviews.push({
        id: doc.id,
        ...data,
        date: dateStr,
      });
    });
    
    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    // If ordering by createdAt fails, try without ordering
    try {
      const reviewsRef = collection(db, COLLECTIONS.REVIEWS);
      const querySnapshot = await getDocs(reviewsRef);
      
      const reviews = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let dateStr = data.date;
        if (data.createdAt && data.createdAt.toDate) {
          dateStr = data.createdAt.toDate().toISOString().split('T')[0];
        }
        
        reviews.push({
          id: doc.id,
          ...data,
          date: dateStr,
        });
      });
      
      // Sort by date manually
      reviews.sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt?.toDate() || 0);
        const dateB = new Date(b.date || b.createdAt?.toDate() || 0);
        return dateB - dateA; // Descending order
      });
      
      return reviews;
    } catch (fallbackError) {
      console.error('Error getting reviews (fallback):', fallbackError);
      return [];
    }
  }
};

/**
 * Add a new review to Firestore
 */
export const addReview = async (reviewData) => {
  try {
    const reviewsRef = collection(db, COLLECTIONS.REVIEWS);
    const newReview = {
      name: reviewData.name.trim(),
      text: reviewData.text.trim(),
      rating: parseInt(reviewData.rating),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      verified: false,
      createdAt: serverTimestamp(),
    };
    
    // Validate review data
    if (!newReview.name || !newReview.text || newReview.rating < 1 || newReview.rating > 5) {
      throw new Error('Invalid review data');
    }
    
    const docRef = await addDoc(reviewsRef, newReview);
    
    // Log success
    console.log('Review successfully saved to Firebase with ID:', docRef.id);
    
    return {
      id: docRef.id,
      ...newReview,
      // Ensure date is a string for consistency
      date: newReview.date,
    };
  } catch (error) {
    console.error('Error adding review to Firebase:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      reviewData: reviewData
    });
    throw new Error(`Failed to save review to Firebase: ${error.message}`);
  }
};

/**
 * Delete a review from Firestore
 */
export const deleteReview = async (reviewId) => {
  try {
    const reviewRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
    await deleteDoc(reviewRef);
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
};

/**
 * Update a review in Firestore
 */
export const updateReview = async (reviewId, updates) => {
  try {
    const reviewRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
    await updateDoc(reviewRef, {
      ...updates,
      lastUpdated: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating review:', error);
    return false;
  }
};

/**
 * Track a view session (to prevent duplicate counting)
 */
export const trackViewSession = async (sessionId) => {
  try {
    const viewRef = doc(db, COLLECTIONS.VIEWS, sessionId);
    const viewSnap = await getDoc(viewRef);
    
    if (!viewSnap.exists()) {
      // New session, count as view
      await setDoc(viewRef, {
        sessionId,
        timestamp: serverTimestamp(),
        counted: true,
      });
      return true; // Should count this view
    } else {
      // Existing session, check if we should count
      const viewData = viewSnap.data();
      const lastViewTime = viewData.timestamp?.toMillis() || 0;
      const now = Date.now();
      const timeSinceLastView = now - lastViewTime;
      
      // Only count if more than 5 seconds have passed
      if (timeSinceLastView > 5000) {
        await updateDoc(viewRef, {
          timestamp: serverTimestamp(),
        });
        return true; // Should count this view
      }
      return false; // Don't count, too soon
    }
  } catch (error) {
    console.error('Error tracking view session:', error);
    return false;
  }
};

export default {
  getEngagementData,
  incrementViews,
  incrementLikes,
  decrementLikes,
  hasUserLiked,
  setUserLiked,
  getAllReviews,
  addReview,
  deleteReview,
  updateReview,
  trackViewSession,
};

