import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaEye, FaThumbsUp } from 'react-icons/fa';
import { 
  trackView, 
  getTotalViews, 
  getTotalLikes, 
  hasUserLiked, 
  toggleLike,
  formatNumber 
} from '../utils/engagementUtils';

const EngagementStats = () => {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Track view on mount
    const newViews = trackView();
    setViews(newViews);
    setLikes(getTotalLikes());
    setIsLiked(hasUserLiked());

    // Update views periodically (every 30 seconds)
    const interval = setInterval(() => {
      setViews(getTotalViews());
      setLikes(getTotalLikes());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setIsAnimating(true);
    const result = toggleLike();
    setLikes(result.totalLikes);
    setIsLiked(result.hasLiked);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-sm:top-2 max-sm:right-2"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* View Count */}
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 shadow-lg border border-white/20 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaEye className="text-[#4ECDC4] text-base sm:text-lg" />
        <span className="text-white font-semibold text-xs sm:text-sm">
          <span className="text-[#CBA135]">{formatNumber(views)}</span>{' '}
          <span className="hidden sm:inline">views</span>
          <span className="sm:hidden">👁</span>
        </span>
      </motion.div>

      {/* Like Button */}
      <motion.button
        onClick={handleLike}
        className={`relative bg-white/10 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 shadow-lg border border-white/20 flex items-center gap-2 transition-all duration-300 ${
          isLiked 
            ? 'bg-gradient-to-r from-pink-500/30 to-red-500/30 border-pink-400/40' 
            : 'hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isAnimating}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        <AnimatePresence mode="wait">
          {isLiked ? (
            <motion.div
              key="liked"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaHeart className="text-red-500 text-base sm:text-lg fill-red-500" />
            </motion.div>
          ) : (
            <motion.div
              key="not-liked"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaHeart className="text-gray-300 text-base sm:text-lg" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <span className="text-white font-semibold text-xs sm:text-sm">
          <span className={isLiked ? 'text-red-400' : 'text-[#CBA135]'}>
            {formatNumber(likes)}
          </span>
          <span className="hidden sm:inline ml-1">
            {likes === 1 ? 'like' : 'likes'}
          </span>
        </span>

        {/* Animation effect when liked */}
        {isAnimating && isLiked && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/20"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default EngagementStats;

