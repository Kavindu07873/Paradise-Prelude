// Centralized image configuration for Paradise Prelude
// This file manages all images used across the application
// Images are automatically discovered from the assets folder structure

// Image file extensions to scan for
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

/**
 * Auto-discover images from assets folder using Vite's glob import
 * This automatically finds all images in the assets/images folder structure
 */
const discoverImages = () => {
  const imageMap = {
    gallery: [],
    hero: [],
    backgrounds: [],
    amenities: [],
    logo: [],
  };

  try {
    // Use Vite's glob import to discover images
    // This will automatically find all images in the assets/images folder
    // Using relative path from config folder
    const imageModules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp,gif,svg}', {
      eager: true,
      import: 'default',
    });

    // Organize images by folder structure
    Object.keys(imageModules).forEach((path) => {
      const imageUrl = imageModules[path];
      
      // Extract category from path
      if (path.includes('/gallery/')) {
        imageMap.gallery.push(imageUrl);
      } else if (path.includes('/hero/')) {
        imageMap.hero.push(imageUrl);
      } else if (path.includes('/backgrounds/')) {
        imageMap.backgrounds.push(imageUrl);
      } else if (path.includes('/amenities/')) {
        imageMap.amenities.push(imageUrl);
      } else if (path.includes('/logo/')) {
        imageMap.logo.push(imageUrl);
      }
    });

    // Sort images alphabetically for consistency
    Object.keys(imageMap).forEach((category) => {
      imageMap[category].sort();
    });
  } catch (error) {
    console.warn('Image auto-discovery failed, using fallback configuration:', error);
  }

  return imageMap;
};

// Auto-discover images from assets folder
const discoveredImages = discoverImages();

// Hero and main banner images
// Priority: Discovered images first, then fallback to external URLs
export const heroImages = {
  main: discoveredImages.hero[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80',
  // Additional hero images from assets folder
  ...discoveredImages.hero.slice(1).reduce((acc, img, idx) => {
    acc[`hero-${idx + 1}`] = img;
    return acc;
  }, {}),
};

// Gallery images - automatically includes all images from assets/images/gallery/
// Priority: Discovered images first, then fallback to external URLs
export const galleryImages = [
  ...discoveredImages.gallery,
  // Fallback external images (only used if no local images found)
  ...(discoveredImages.gallery.length === 0 ? [
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    'https://unsplash.it/600/400?image=1050',
    'https://unsplash.it/600/400?image=1043',
    'https://unsplash.it/600/400?image=1039',
    'https://unsplash.it/600/400?image=1027',
    'https://unsplash.it/600/400?image=1015',
    'https://unsplash.it/600/400?image=1003',
    'https://unsplash.it/600/400?image=998',
    'https://unsplash.it/600/400?image=990',
  ] : []),
];

// Background images - automatically includes all images from assets/images/backgrounds/
export const backgroundImages = [
  ...discoveredImages.backgrounds,
];

// Amenity images for amenities section
// Priority: Discovered images first, then fallback to external URLs
export const amenityImages = {
  // Add discovered amenity images
  ...discoveredImages.amenities.reduce((acc, img, idx) => {
    // Extract filename without extension as key
    const filename = img.split('/').pop().split('.')[0];
    acc[filename] = img;
    return acc;
  }, {}),
  // Fallback external images
  pool: discoveredImages.amenities.find(img => img.includes('pool')) || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
  spa: discoveredImages.amenities.find(img => img.includes('spa')) || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
  garden: discoveredImages.amenities.find(img => img.includes('garden')) || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
  beach: discoveredImages.amenities.find(img => img.includes('beach')) || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
};

// Logo images - automatically includes all images from assets/images/logo/
export const logoImages = {
  main: discoveredImages.logo[0] || null,
  ...discoveredImages.logo.slice(1).reduce((acc, img, idx) => {
    acc[`logo-${idx + 1}`] = img;
    return acc;
  }, {}),
};

// Local images (from assets folder) - consolidated view
export const localImages = {
  whatsapp: discoveredImages.gallery.find(img => img.includes('whatsapp')) || '/assets/images/gallery/whatsapp-image.jpg',
  // Add all discovered images by category
  gallery: discoveredImages.gallery,
  hero: discoveredImages.hero,
  backgrounds: discoveredImages.backgrounds,
  amenities: discoveredImages.amenities,
  logo: discoveredImages.logo,
};

// Image categories for easy organization
export const imageCategories = {
  hero: heroImages,
  gallery: galleryImages,
  backgrounds: backgroundImages,
  amenities: amenityImages,
  logo: logoImages,
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

// Utility function to add new images to a category (for runtime additions)
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

// Utility function to get discovered images count
export const getDiscoveredImagesCount = () => {
  return {
    gallery: discoveredImages.gallery.length,
    hero: discoveredImages.hero.length,
    backgrounds: discoveredImages.backgrounds.length,
    amenities: discoveredImages.amenities.length,
    logo: discoveredImages.logo.length,
    total: Object.values(discoveredImages).reduce((sum, arr) => sum + arr.length, 0),
  };
};

// Default export with all images
export default {
  heroImages,
  galleryImages,
  backgroundImages,
  amenityImages,
  logoImages,
  localImages,
  imageCategories,
  getImagesByCategory,
  getImage,
  addImageToCategory,
  getDiscoveredImagesCount,
  discoveredImages, // Export for debugging/inspection
};
