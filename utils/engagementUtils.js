// Engagement tracking utilities for Paradise Prelude
// Tracks live views, likes, and user engagement

const STORAGE_KEYS = {
  VIEWS: 'paradise_prelude_total_views',
  LIKES: 'paradise_prelude_total_likes',
  USER_LIKED: 'paradise_prelude_user_liked',
  SESSION_ID: 'paradise_prelude_session_id',
  LAST_VIEW_TIME: 'paradise_prelude_last_view_time',
};

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
    const stored = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
    const lastViewTime = localStorage.getItem(STORAGE_KEYS.LAST_VIEW_TIME);
    
    // Check if session expired
    if (stored && lastViewTime) {
      const timeSinceLastView = Date.now() - parseInt(lastViewTime);
      if (timeSinceLastView < SESSION_TIMEOUT) {
        // Update last view time
        localStorage.setItem(STORAGE_KEYS.LAST_VIEW_TIME, Date.now().toString());
        return stored;
      }
    }
    
    // Create new session
    const newSessionId = generateSessionId();
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, newSessionId);
    localStorage.setItem(STORAGE_KEYS.LAST_VIEW_TIME, Date.now().toString());
    return newSessionId;
  } catch (error) {
    console.error('Error getting session ID:', error);
    return generateSessionId();
  }
};

/**
 * Track a new view
 * @returns {number} - Total view count
 */
export const trackView = () => {
  try {
    const sessionId = getSessionId();
    const storedViews = localStorage.getItem(STORAGE_KEYS.VIEWS);
    let totalViews = storedViews ? parseInt(storedViews) : 0;
    
    // Check if this is a new session (not just a page refresh within same session)
    const lastViewTime = localStorage.getItem(STORAGE_KEYS.LAST_VIEW_TIME);
    if (lastViewTime) {
      const timeSinceLastView = Date.now() - parseInt(lastViewTime);
      // Only count as new view if more than 5 seconds have passed (to avoid rapid refreshes)
      if (timeSinceLastView > 5000) {
        totalViews += 1;
        localStorage.setItem(STORAGE_KEYS.VIEWS, totalViews.toString());
      }
    } else {
      // First view ever
      totalViews = 1;
      localStorage.setItem(STORAGE_KEYS.VIEWS, totalViews.toString());
    }
    
    // Update last view time
    localStorage.setItem(STORAGE_KEYS.LAST_VIEW_TIME, Date.now().toString());
    
    return totalViews;
  } catch (error) {
    console.error('Error tracking view:', error);
    return 0;
  }
};

/**
 * Get total view count
 * @returns {number} - Total view count
 */
export const getTotalViews = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.VIEWS);
    return stored ? parseInt(stored) : 0;
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
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_LIKED);
    return stored === 'true';
  } catch (error) {
    console.error('Error checking if user liked:', error);
    return false;
  }
};

/**
 * Add a like
 * @returns {number} - Total like count
 */
export const addLike = () => {
  try {
    // Check if user already liked
    if (hasUserLiked()) {
      return getTotalLikes();
    }
    
    const storedLikes = localStorage.getItem(STORAGE_KEYS.LIKES);
    let totalLikes = storedLikes ? parseInt(storedLikes) : 0;
    totalLikes += 1;
    
    localStorage.setItem(STORAGE_KEYS.LIKES, totalLikes.toString());
    localStorage.setItem(STORAGE_KEYS.USER_LIKED, 'true');
    
    return totalLikes;
  } catch (error) {
    console.error('Error adding like:', error);
    return getTotalLikes();
  }
};

/**
 * Remove a like (unlike)
 * @returns {number} - Total like count
 */
export const removeLike = () => {
  try {
    // Check if user has liked
    if (!hasUserLiked()) {
      return getTotalLikes();
    }
    
    const storedLikes = localStorage.getItem(STORAGE_KEYS.LIKES);
    let totalLikes = storedLikes ? parseInt(storedLikes) : 0;
    
    if (totalLikes > 0) {
      totalLikes -= 1;
      localStorage.setItem(STORAGE_KEYS.LIKES, totalLikes.toString());
      localStorage.setItem(STORAGE_KEYS.USER_LIKED, 'false');
    }
    
    return totalLikes;
  } catch (error) {
    console.error('Error removing like:', error);
    return getTotalLikes();
  }
};

/**
 * Get total like count
 * @returns {number} - Total like count
 */
export const getTotalLikes = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LIKES);
    return stored ? parseInt(stored) : 0;
  } catch (error) {
    console.error('Error getting total likes:', error);
    return 0;
  }
};

/**
 * Toggle like (like/unlike)
 * @returns {Object} - Object with like count and liked status
 */
export const toggleLike = () => {
  const hasLiked = hasUserLiked();
  const totalLikes = hasLiked ? removeLike() : addLike();
  
  return {
    totalLikes,
    hasLiked: !hasLiked,
  };
};

/**
 * Get engagement statistics
 * @returns {Object} - Engagement statistics
 */
export const getEngagementStats = () => {
  return {
    totalViews: getTotalViews(),
    totalLikes: getTotalLikes(),
    hasUserLiked: hasUserLiked(),
    sessionId: getSessionId(),
  };
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
export const resetEngagementData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.VIEWS);
    localStorage.removeItem(STORAGE_KEYS.LIKES);
    localStorage.removeItem(STORAGE_KEYS.USER_LIKED);
    localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    localStorage.removeItem(STORAGE_KEYS.LAST_VIEW_TIME);
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

