// Image utility functions for Paradise Prelude
// This file provides helper functions for managing images across the application

import { imageCategories, getImagesByCategory, getImage, addImageToCategory } from '../config/images';

/**
 * Get all images from a specific category
 * @param {string} category - The category name (hero, gallery, amenities, local)
 * @returns {Array|Object} - Array of images or object with image keys
 */
export const getCategoryImages = (category) => {
  return getImagesByCategory(category);
};

/**
 * Get a specific image by category and key
 * @param {string} category - The category name
 * @param {string} key - The image key (for object-based categories)
 * @returns {string|null} - The image URL or null if not found
 */
export const getImageByKey = (category, key) => {
  return getImage(category, key);
};

/**
 * Add a new image to a category
 * @param {string} category - The category name
 * @param {string} imageUrl - The image URL
 * @param {string} key - Optional key for object-based categories
 */
export const addImage = (category, imageUrl, key = null) => {
  addImageToCategory(category, imageUrl, key);
};

/**
 * Get random images from a category
 * @param {string} category - The category name
 * @param {number} count - Number of random images to return
 * @returns {Array} - Array of random image URLs
 */
export const getRandomImages = (category, count = 3) => {
  const images = getImagesByCategory(category);
  if (Array.isArray(images)) {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  return [];
};

/**
 * Get images for gallery preview (first few images)
 * @param {number} count - Number of images for preview
 * @returns {Array} - Array of gallery image URLs
 */
export const getGalleryPreview = (count = 3) => {
  const galleryImages = getImagesByCategory('gallery');
  return galleryImages.slice(0, count);
};

/**
 * Get hero image
 * @param {string} type - Type of hero image (main, secondary, etc.)
 * @returns {string} - Hero image URL
 */
export const getHeroImage = (type = 'main') => {
  return getImage('hero', type);
};

/**
 * Get amenity images
 * @param {Array} amenityTypes - Array of amenity types to get images for
 * @returns {Object} - Object with amenity types as keys and image URLs as values
 */
export const getAmenityImages = (amenityTypes = ['pool', 'spa', 'garden', 'beach']) => {
  const amenityImages = {};
  amenityTypes.forEach(type => {
    amenityImages[type] = getImage('amenities', type);
  });
  return amenityImages;
};

/**
 * Check if an image URL is local (starts with /assets)
 * @param {string} imageUrl - The image URL to check
 * @returns {boolean} - True if the image is local
 */
export const isLocalImage = (imageUrl) => {
  return imageUrl && imageUrl.startsWith('/assets');
};

/**
 * Get image dimensions from URL (for external images)
 * @param {string} imageUrl - The image URL
 * @returns {Object} - Object with width and height if available
 */
export const getImageDimensions = (imageUrl) => {
  // This is a placeholder function - in a real app, you might want to
  // implement actual image dimension detection
  if (imageUrl.includes('unsplash.com')) {
    // Extract dimensions from Unsplash URLs if available
    const match = imageUrl.match(/w=(\d+)/);
    if (match) {
      return { width: parseInt(match[1]), height: 'auto' };
    }
  }
  return { width: 'auto', height: 'auto' };
};

/**
 * Generate optimized image URL for different sizes
 * @param {string} imageUrl - The original image URL
 * @param {number} width - Desired width
 * @param {number} height - Desired height (optional)
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (imageUrl, width, height = null) => {
  if (imageUrl.includes('unsplash.com')) {
    // For Unsplash images, add size parameters
    const baseUrl = imageUrl.split('?')[0];
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('w', width.toString());
    if (height) {
      params.set('h', height.toString());
    }
    params.set('q', '80');
    return `${baseUrl}?${params.toString()}`;
  }
  return imageUrl;
};

// Default export with all utility functions
export default {
  getCategoryImages,
  getImageByKey,
  addImage,
  getRandomImages,
  getGalleryPreview,
  getHeroImage,
  getAmenityImages,
  isLocalImage,
  getImageDimensions,
  getOptimizedImageUrl,
};
