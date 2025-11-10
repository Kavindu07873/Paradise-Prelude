# Amenities Management System

This document explains how to manage amenities in the Paradise Prelude project.

## Overview

The project now uses a centralized amenities management system that makes it easy to:
- Display the same amenities on both Home page and Amenities page
- Organize amenities by categories
- Filter amenities by category
- Add new amenities easily
- Maintain consistent styling and animations

## File Structure

```
config/
└── amenities.js          # Centralized amenities configuration
components/
└── AmenityCard.jsx       # Amenity card component
pages/
├── Home.jsx             # Features amenities preview
└── Amenities.jsx        # Full amenities page with filtering
```

## Features

### 1. Centralized Amenities Storage
- All amenities are defined in one configuration file
- Amenities are categorized for easy organization
- Featured amenities can be highlighted for home page preview

### 2. Category System
Amenities are organized into categories:
- **recreation**: Pool, Beach Access, Game Room
- **nature**: Private Garden, Mountain Views
- **view**: Ocean View, Mountain Views
- **dining**: Chef-on-call
- **comfort**: Wi-Fi, AC & Security, Luxury Bedding, Smart TV
- **wellness**: Spa & Yoga Lounge
- **convenience**: Free Parking
- **entertainment**: Smart TV, Game Room

### 3. Home Page Integration
- Shows 6 featured amenities in a grid layout
- Beautiful animations and hover effects
- "View All Amenities" button linking to full page

### 4. Amenities Page Features
- Category filtering system
- All amenities displayed in organized grid
- Smooth animations when switching categories
- Responsive design for all devices

## Adding New Amenities

### 1. Add to Configuration
Edit `config/amenities.js` and add your amenity to the amenities array:

```javascript
{
  id: 13, // Unique ID
  icon: <FaNewIcon className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />,
  title: 'New Amenity',
  description: 'Description of the new amenity.',
  category: 'comfort', // Choose appropriate category
  featured: true, // Set to true to show on home page
}
```

### 2. Import Required Icons
Make sure to import any new icons at the top of the file:

```javascript
import { FaNewIcon } from 'react-icons/fa';
```

### 3. That's It!
The new amenity will automatically appear:
- ✅ On the Amenities page (in appropriate category)
- ✅ On the Home page (if featured: true)
- ✅ In category filters

## Amenity Data Structure

```javascript
{
  id: 1,                    // Unique identifier
  icon: <FaIcon />,         // React icon component
  title: 'Amenity Name',    // Display title
  description: 'Description', // Short description
  category: 'category',     // Category for filtering
  featured: true           // Show on home page
}
```

## Using Amenities in Components

### Home Page (Featured Amenities)
```javascript
import { getFeaturedAmenities } from '../config/amenities';

const Home = () => {
  const featuredAmenities = getFeaturedAmenities(6); // Get 6 featured amenities
  // Use amenities in component...
};
```

### Amenities Page (All Amenities)
```javascript
import { getAllAmenities, getAmenityCategories } from '../config/amenities';

const Amenities = () => {
  const allAmenities = getAllAmenities();
  const categories = getAmenityCategories();
  // Use amenities in component...
};
```

### Filter by Category
```javascript
import { getAmenitiesByCategory } from '../config/amenities';

const recreationAmenities = getAmenitiesByCategory('recreation');
```

## Available Functions

### Core Functions (`config/amenities.js`)
- `getAllAmenities()` - Get all amenities
- `getFeaturedAmenities(count)` - Get featured amenities for home page
- `getAmenitiesByCategory(category)` - Get amenities by category
- `getAmenityCategories()` - Get all available categories
- `getAmenityById(id)` - Get specific amenity by ID
- `searchAmenities(term)` - Search amenities by title/description
- `getAmenityCountByCategory()` - Get count of amenities per category

### Animation Variants
- `amenitiesAnimationVariants` - Pre-configured animation variants for consistent animations

## Amenity Categories

### Recreation
- Infinity Pool
- Beach Access
- Game Room

### Nature
- Private Garden
- Mountain Views

### View
- Ocean View
- Mountain Views

### Dining
- Chef-on-call

### Comfort
- Wi-Fi, AC & Security
- Luxury Bedding
- Smart TV

### Wellness
- Spa & Yoga Lounge

### Convenience
- Free Parking

### Entertainment
- Smart TV
- Game Room

## Styling and Animations

### AmenityCard Component
The `AmenityCard` component provides:
- Consistent styling across all amenities
- Hover animations and effects
- Responsive design
- Beautiful glass-morphism effect

### Animation System
- Staggered animations for grid items
- Smooth category transitions
- Hover effects on individual cards
- Scroll-triggered animations

## Best Practices

### 1. Icon Selection
- Use consistent icon style (react-icons/fa)
- Choose icons that clearly represent the amenity
- Ensure icons are visually distinct

### 2. Descriptions
- Keep descriptions concise but informative
- Use consistent tone and style
- Highlight key benefits

### 3. Categories
- Use existing categories when possible
- Create new categories only when necessary
- Keep category names simple and clear

### 4. Featured Amenities
- Select amenities that best represent the property
- Limit to 6 amenities for home page
- Choose amenities with strong visual appeal

## Migration from Old System

The old system used hardcoded amenity arrays in individual components. The new system:

1. ✅ Centralizes all amenity management
2. ✅ Makes amenities reusable across components
3. ✅ Provides category-based organization
4. ✅ Includes filtering and search capabilities
5. ✅ Maintains consistent styling and animations
6. ✅ Makes it easy to add new amenities

All existing functionality is preserved while adding these new capabilities.

## Future Enhancements

Potential improvements for the amenities system:
- Amenity images/photos
- Detailed amenity descriptions
- Amenity availability status
- Amenity booking/reservation system
- Amenity reviews and ratings
- Amenity location mapping
- Amenity operating hours
- Amenity pricing information

