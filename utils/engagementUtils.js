// Engagement tracking utilities for Paradise Prelude
// Now uses Firebase Firestore for persistent storage across devices

import {
  getEngagementData,
  incrementViews,
  incrementLikes,
  decrementLikes,
  hasUserLiked as checkUserLiked,
  setUserLiked,
  trackViewSession,
} from '../services/firebaseService';

// Session timeout (30 minutes of inactivity)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * Generate a unique session ID
 * @returns {string} - Unique session ID
 */
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get or create session ID
 * @returns {string} - Session ID
 */
const getSessionId = () => {
  try {
    const stored = localStorage.getItem('paradise_prelude_session_id');
    const lastViewTime = localStorage.getItem('paradise_prelude_last_view_time');
    
    // Check if session expired
    if (stored && lastViewTime) {
      const timeSinceLastView = Date.now() - parseInt(lastViewTime);
      if (timeSinceLastView < SESSION_TIMEOUT) {
        // Update last view time
        localStorage.setItem('paradise_prelude_last_view_time', Date.now().toString());
        return stored;
      }
    }
    
    // Create new session
    const newSessionId = generateSessionId();
    localStorage.setItem('paradise_prelude_session_id', newSessionId);
    localStorage.setItem('paradise_prelude_last_view_time', Date.now().toString());
    return newSessionId;
  } catch (error) {
    console.error('Error getting session ID:', error);
    return generateSessionId();
  }
};

/**
 * Track a new view
 * @returns {Promise<number>} - Total view count
 */
export const trackView = async () => {
  try {
    const sessionId = getSessionId();
    
    // Check if this session should be counted
    const shouldCount = await trackViewSession(sessionId);
    
    if (shouldCount) {
      // Increment view count in Firebase
      const totalViews = await incrementViews();
      return totalViews;
    } else {
      // Don't count, but return current count
      const engagement = await getEngagementData();
      return engagement.totalViews || 0;
    }
  } catch (error) {
    console.error('Error tracking view:', error);
    return 0;
  }
};

/**
 * Get total view count
 * @returns {Promise<number>} - Total view count
 */
export const getTotalViews = async () => {
  try {
    const engagement = await getEngagementData();
    return engagement.totalViews || 0;
  } catch (error) {
    console.error('Error getting total views:', error);
    return 0;
  }
};

/**
 * Check if user has already liked
 * @returns {boolean} - True if user has liked
 */
export const hasUserLiked = () => {
  return checkUserLiked();
};

/**
 * Add a like
 * @returns {Promise<number>} - Total like count
 */
export const addLike = async () => {
  try {
    // Check if user already liked
    if (hasUserLiked()) {
      return await getTotalLikes();
    }
    
    // Increment like count in Firebase
    const totalLikes = await incrementLikes();
    setUserLiked(true);
    
    return totalLikes;
  } catch (error) {
    console.error('Error adding like:', error);
    return await getTotalLikes();
  }
};

/**
 * Remove a like (unlike)
 * @returns {Promise<number>} - Total like count
 */
export const removeLike = async () => {
  try {
    // Check if user has liked
    if (!hasUserLiked()) {
      return await getTotalLikes();
    }
    
    // Decrement like count in Firebase
    const totalLikes = await decrementLikes();
    setUserLiked(false);
    
    return totalLikes;
  } catch (error) {
    console.error('Error removing like:', error);
    return await getTotalLikes();
  }
};

/**
 * Get total like count
 * @returns {Promise<number>} - Total like count
 */
export const getTotalLikes = async () => {
  try {
    const engagement = await getEngagementData();
    return engagement.totalLikes || 0;
  } catch (error) {
    console.error('Error getting total likes:', error);
    return 0;
  }
};

/**
 * Toggle like (like/unlike)
 * @returns {Promise<Object>} - Object with like count and liked status
 */
export const toggleLike = async () => {
  const hasLiked = hasUserLiked();
  const totalLikes = hasLiked ? await removeLike() : await addLike();
  
  return {
    totalLikes,
    hasLiked: !hasLiked,
  };
};

/**
 * Get engagement statistics
 * @returns {Promise<Object>} - Engagement statistics
 */
export const getEngagementStats = async () => {
  try {
    const engagement = await getEngagementData();
    return {
      totalViews: engagement.totalViews || 0,
      totalLikes: engagement.totalLikes || 0,
      hasUserLiked: hasUserLiked(),
      sessionId: getSessionId(),
    };
  } catch (error) {
    console.error('Error getting engagement stats:', error);
    return {
      totalViews: 0,
      totalLikes: 0,
      hasUserLiked: false,
      sessionId: getSessionId(),
    };
  }
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  return num.toLocaleString('en-US');
};

/**
 * Reset all engagement data (admin function)
 */
export const resetEngagementData = async () => {
  try {
    // Note: This would need to be implemented in Firebase service
    // For now, just clear local storage
    localStorage.removeItem('paradise_prelude_user_liked');
    localStorage.removeItem('paradise_prelude_session_id');
    localStorage.removeItem('paradise_prelude_last_view_time');
    return true;
  } catch (error) {
    console.error('Error resetting engagement data:', error);
    return false;
  }
};

// Default export
export default {
  trackView,
  getTotalViews,
  hasUserLiked,
  addLike,
  removeLike,
  getTotalLikes,
  toggleLike,
  getEngagementStats,
  formatNumber,
  resetEngagementData,
};
