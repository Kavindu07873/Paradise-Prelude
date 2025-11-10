import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { addReview } from '../config/reviews';

const ReviewForm = ({ onReviewAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 0,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleRatingHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate form
      if (!formData.name.trim() || !formData.text.trim() || formData.rating === 0) {
        throw new Error('Please fill in all fields and select a rating');
      }

      if (formData.text.trim().length < 10) {
        throw new Error('Review must be at least 10 characters long');
      }

      // Add review to Firebase
      const newReview = await addReview(formData);
      
      // Show success message
      setSubmitMessage('Thank you for your review! It has been saved to Firebase successfully.');
      
      // Reset form
      setFormData({
        name: '',
        text: '',
        rating: 0,
      });
      
      // Notify parent component after a short delay for smooth UX
      setTimeout(() => {
        if (onReviewAdded) {
          onReviewAdded(newReview);
        }
      }, 1000);

    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage(error.message || 'Failed to submit review. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (hoveredRating || formData.rating);
      
      return (
        <button
          key={index}
          type="button"
          className={`text-2xl transition-colors duration-200 ${
            isFilled ? 'text-[#CBA135]' : 'text-gray-400'
          } hover:text-[#CBA135] focus:outline-none`}
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => handleRatingHover(starValue)}
          onMouseLeave={handleRatingLeave}
          disabled={isSubmitting}
        >
          <FaStar />
        </button>
      );
    });
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-serif font-bold text-center mb-6 text-[#CBA135]">
        Share Your Experience
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CBA135] focus:border-transparent"
            placeholder="Enter your name"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Rating Field */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Rating *
          </label>
          <div className="flex space-x-2 justify-center">
            {renderStars()}
          </div>
          <p className="text-sm text-gray-300 text-center mt-2">
            {formData.rating > 0 && (
              <>
                {formData.rating} star{formData.rating !== 1 ? 's' : ''} - {' '}
                {formData.rating === 5 && 'Excellent'}
                {formData.rating === 4 && 'Very Good'}
                {formData.rating === 3 && 'Good'}
                {formData.rating === 2 && 'Fair'}
                {formData.rating === 1 && 'Poor'}
              </>
            )}
          </p>
        </div>

        {/* Review Text Field */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-200 mb-2">
            Your Review *
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CBA135] focus:border-transparent resize-none"
            placeholder="Tell us about your experience at Paradise Prelude..."
            required
            disabled={isSubmitting}
            minLength={10}
            maxLength={500}
          />
          <p className="text-sm text-gray-400 mt-1">
            {formData.text.length}/500 characters (minimum 10)
          </p>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || !formData.name.trim() || !formData.text.trim() || formData.rating === 0}
            className="px-8 py-3 bg-gradient-to-r from-[#CBA135] to-[#4ECDC4] hover:from-[#4ECDC4] hover:to-[#CBA135] text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting to Firebase...
              </span>
            ) : (
              'Submit Review'
            )}
          </button>
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <motion.div
            className={`text-center p-3 rounded-lg ${
              submitMessage.includes('Thank you') || submitMessage.includes('successfully')
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {submitMessage}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ReviewForm;
