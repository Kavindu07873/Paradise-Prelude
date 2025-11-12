// Centralized amenities configuration for Paradise Prelude
// This file manages all amenities used across the application

import { 
  FaSwimmingPool, 
  FaSpa, 
  FaWifi, 
  FaShieldAlt, 
  FaLeaf, 
  FaUtensils, 
  FaWind, 
  FaEye,
  FaCar,
  FaBed,
  FaTv,
  FaUmbrellaBeach,
  FaMountain,
  FaGamepad,
  FaMusic
} from 'react-icons/fa';

// Main amenities data
export const amenities = [
  // {
  //   id: 1,
  //   iconComponent: 'FaSwimmingPool',
  //   title: 'Infinity Pool',
  //   description: 'Swim with breathtaking ocean views.',
  //   category: 'recreation',
  //   featured: true,
  // },
  {
    id: 2,
    iconComponent: 'FaLeaf',
    title: 'Private Garden',
    description: 'Lush, tranquil spaces for relaxation.',
    category: 'nature',
    featured: true,
  },
  // {
  //   id: 3,
  //   iconComponent: 'FaEye',
  //   title: 'Ocean View',
  //   description: 'Panoramic vistas from every room.',
  //   category: 'view',
  //   featured: true,
  // },
  // {
  //   id: 4,
  //   iconComponent: 'FaUtensils',
  //   title: 'Chef-on-call',
  //   description: 'Gourmet dining at your convenience.',
  //   category: 'dining',
  //   featured: true,
  // },
  {
    id: 5,
    iconComponent: 'FaWifi',
    title: 'Wi-Fi, AC & Security',
    description: 'Modern comforts and peace of mind.',
    category: 'comfort',
    featured: true,
  },
  // {
  //   id: 6,
  //   iconComponent: 'FaSpa',
  //   title: 'Spa & Yoga Lounge',
  //   description: 'Wellness and serenity await.',
  //   category: 'wellness',
  //   featured: true,
  // },
  {
    id: 7,
    iconComponent: 'FaCar',
    title: 'Free Parking',
    description: 'Convenient parking for your vehicle.',
    category: 'convenience',
    featured: false,
  },
  {
    id: 8,
    iconComponent: 'FaBed',
    title: 'Luxury Bedding',
    description: 'Premium comfort for restful sleep.',
    category: 'comfort',
    featured: false,
  },
  {
    id: 9,
    iconComponent: 'FaTv',
    title: 'Smart TV',
    description: 'Entertainment at your fingertips.',
    category: 'entertainment',
    featured: false,
  },
  {
    id: 10,
    iconComponent: 'FaUmbrellaBeach',
    title: 'Beach Access',
    description: 'Direct access to pristine beaches.',
    category: 'recreation',
    featured: false,
  },
  {
    id: 11,
    iconComponent: 'FaMountain',
    title: 'Mountain Views',
    description: 'Stunning mountain vistas.',
    category: 'view',
    featured: false,
  },
  {
    id: 12,
    iconComponent: 'FaGamepad',
    title: 'Game Room',
    description: 'Fun activities for all ages.',
    category: 'entertainment',
    featured: false,
  },
];

// Get amenities by category
export const getAmenitiesByCategory = (category) => {
  return amenities.filter(amenity => amenity.category === category);
};

// Get featured amenities (for home page preview)
export const getFeaturedAmenities = (count = 6) => {
  return amenities.filter(amenity => amenity.featured).slice(0, count);
};

// Get all amenities (for amenities page)
export const getAllAmenities = () => {
  return amenities;
};

// Get amenity by ID
export const getAmenityById = (id) => {
  return amenities.find(amenity => amenity.id === id);
};

// Get amenities by multiple categories
export const getAmenitiesByCategories = (categories) => {
  return amenities.filter(amenity => categories.includes(amenity.category));
};

// Get unique categories
export const getAmenityCategories = () => {
  const categories = [...new Set(amenities.map(amenity => amenity.category))];
  return categories;
};

// Search amenities by title or description
export const searchAmenities = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return amenities.filter(amenity => 
    amenity.title.toLowerCase().includes(term) ||
    amenity.description.toLowerCase().includes(term) ||
    amenity.category.toLowerCase().includes(term)
  );
};

// Get amenities count by category
export const getAmenityCountByCategory = () => {
  const categories = getAmenityCategories();
  return categories.reduce((acc, category) => {
    acc[category] = getAmenitiesByCategory(category).length;
    return acc;
  }, {});
};

// Animation variants for amenities
export const amenitiesAnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  },
};

// Icon mapping for dynamic icon rendering
export const iconMap = {
  FaSwimmingPool,
  FaLeaf,
  FaEye,
  FaUtensils,
  FaWifi,
  FaSpa,
  FaCar,
  FaBed,
  FaTv,
  FaUmbrellaBeach,
  FaMountain,
  FaGamepad,
  FaMusic,
};

// Get icon component by name
export const getIconComponent = (iconName) => {
  return iconMap[iconName] || FaSwimmingPool; // Default fallback
};

// Get amenity with icon component name (no JSX)
export const getAmenityWithIcon = (amenity) => {
  return {
    ...amenity,
    iconComponent: amenity.iconComponent
  };
};

// Get amenities with icon component names (no JSX)
export const getAmenitiesWithIcons = (amenitiesList) => {
  return amenitiesList.map(getAmenityWithIcon);
};

// Default export with all amenities and functions
export default {
  amenities,
  getAmenitiesByCategory,
  getFeaturedAmenities,
  getAllAmenities,
  getAmenityById,
  getAmenitiesByCategories,
  getAmenityCategories,
  searchAmenities,
  getAmenityCountByCategory,
  amenitiesAnimationVariants,
  getIconComponent,
  getAmenityWithIcon,
  getAmenitiesWithIcons,
};
