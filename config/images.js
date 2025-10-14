// Centralized image configuration for Paradise Prelude
// This file manages all images used across the application

// Hero and main banner images
export const heroImages = {
  main: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80',
  // Add more hero images here as needed
  // secondary: '/assets/images/hero/hero-2.jpg',
  // tertiary: '/assets/images/hero/hero-3.jpg',
};

// Gallery images - used in both Home page preview and Gallery page
export const galleryImages = [
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  'https://unsplash.it/600/400?image=1050',
  'https://unsplash.it/600/400?image=1043',
  'https://unsplash.it/600/400?image=1039',
  'https://unsplash.it/600/400?image=1027',
  'https://unsplash.it/600/400?image=1015',
  'https://unsplash.it/600/400?image=1003',
  'https://unsplash.it/600/400?image=998',
  'https://unsplash.it/600/400?image=990',
  // Add more gallery images here
  // '/assets/images/gallery/gallery-1.jpg',
  // '/assets/images/gallery/gallery-2.jpg',
  // '/assets/images/gallery/gallery-3.jpg',
];

// Amenity images for amenities section
export const amenityImages = {
  pool: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
  garden: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  // Add more amenity images here
  // restaurant: '/assets/images/amenities/restaurant.jpg',
  // gym: '/assets/images/amenities/gym.jpg',
};

// Local images (from assets folder)
export const localImages = {
  whatsapp: '/assets/images/gallery/whatsapp-image.jpg',
  // Add more local images here as you add them to the assets folder
  // logo: '/assets/images/logo/logo.png',
  // background: '/assets/images/backgrounds/bg-1.jpg',
};

// Image categories for easy organization
export const imageCategories = {
  hero: heroImages,
  gallery: galleryImages,
  amenities: amenityImages,
  local: localImages,
};

// Utility function to get all images of a specific category
export const getImagesByCategory = (category) => {
  return imageCategories[category] || [];
};

// Utility function to get a specific image by key
export const getImage = (category, key) => {
  const categoryImages = imageCategories[category];
  if (Array.isArray(categoryImages)) {
    return categoryImages[key] || null;
  }
  return categoryImages?.[key] || null;
};

// Utility function to add new images to a category
export const addImageToCategory = (category, imageUrl, key = null) => {
  if (key) {
    // For object-based categories (like hero, amenities)
    if (imageCategories[category] && typeof imageCategories[category] === 'object') {
      imageCategories[category][key] = imageUrl;
    }
  } else {
    // For array-based categories (like gallery)
    if (imageCategories[category] && Array.isArray(imageCategories[category])) {
      imageCategories[category].push(imageUrl);
    }
  }
};

// Default export with all images
export default {
  heroImages,
  galleryImages,
  amenityImages,
  localImages,
  imageCategories,
  getImagesByCategory,
  getImage,
  addImageToCategory,
};
