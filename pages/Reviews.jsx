import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { getReviewsForPage, getAverageRating, getRatingDistribution } from '../config/reviews';
import ReviewForm from '../components/ReviewForm';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [idx, setIdx] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});

  // Load reviews on component mount
  useEffect(() => {
    const loadReviews = () => {
      const allReviews = getReviewsForPage();
      setReviews(allReviews);
      setAverageRating(getAverageRating());
      setRatingDistribution(getRatingDistribution());
    };
    
    loadReviews();
  }, []);

  const next = () => setIdx((idx + 1) % reviews.length);
  const prev = () => setIdx((idx - 1 + reviews.length) % reviews.length);

  const handleReviewAdded = (newReview) => {
    // Refresh reviews when a new one is added
    const allReviews = getReviewsForPage();
    setReviews(allReviews);
    setAverageRating(getAverageRating());
    setRatingDistribution(getRatingDistribution());
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2 className="text-4xl font-serif font-bold text-center mb-8 text-[#CBA135]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        Guest Reviews
      </motion.h2>

      {/* Review Statistics */}
      <motion.div 
        className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-[#CBA135] mb-2">{averageRating}</div>
            <div className="text-gray-300">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`text-sm ${i < Math.floor(averageRating) ? 'text-[#CBA135]' : 'text-gray-400'}`} 
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#4ECDC4] mb-2">{reviews.length}</div>
            <div className="text-gray-300">Total Reviews</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#CBA135] mb-2">
              {ratingDistribution[5] || 0}
            </div>
            <div className="text-gray-300">5-Star Reviews</div>
          </div>
        </div>
      </motion.div>

      {/* Review Carousel */}
      {reviews.length > 0 && (
        <motion.div 
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(reviews[idx].rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#CBA135] text-xl" />
                  ))}
                </div>
                <p className="text-lg text-gray-100 font-serif mb-4">"{reviews[idx].text}"</p>
                <div className="text-[#4ECDC4] font-semibold">{reviews[idx].name}</div>
                <div className="text-sm text-gray-400 mt-2">{reviews[idx].date}</div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between mt-6">
              <button 
                onClick={prev} 
                className="px-4 py-2 bg-[#CBA135] text-white rounded-full font-semibold hover:bg-[#4ECDC4] transition"
              >
                Prev
              </button>
              <span className="text-gray-300 self-center">
                {idx + 1} of {reviews.length}
              </span>
              <button 
                onClick={next} 
                className="px-4 py-2 bg-[#CBA135] text-white rounded-full font-semibold hover:bg-[#4ECDC4] transition"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Review Button */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-8 py-3 bg-gradient-to-r from-[#CBA135] to-[#4ECDC4] hover:from-[#4ECDC4] hover:to-[#CBA135] text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </motion.div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewForm onReviewAdded={handleReviewAdded} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reviews; 