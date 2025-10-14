# Image Management System

This document explains how to manage images in the Paradise Prelude project.

## Overview

The project now uses a centralized image management system that makes it easy to:
- Add new images to the project
- Use the same images across different pages
- Organize images by category
- Manage both local and external images

## File Structure

```
assets/
├── images/
│   ├── gallery/          # Gallery images
│   ├── hero/            # Hero/banner images
│   ├── amenities/       # Amenity images
│   ├── backgrounds/     # Background images
│   └── logo/           # Logo and branding images
config/
└── images.js           # Centralized image configuration
utils/
└── imageUtils.js       # Image utility functions
```

## Adding New Images

### 1. Adding Local Images

1. **Place your image file** in the appropriate folder:
   - `assets/images/gallery/` - for gallery images
   - `assets/images/hero/` - for hero/banner images
   - `assets/images/amenities/` - for amenity images
   - `assets/images/backgrounds/` - for background images
   - `assets/images/logo/` - for logo images

2. **Update the configuration** in `config/images.js`:
   ```javascript
   // For gallery images (array)
   export const galleryImages = [
     // existing images...
     '/assets/images/gallery/your-new-image.jpg',
   ];

   // For hero images (object)
   export const heroImages = {
     main: 'https://images.unsplash.com/...',
     secondary: '/assets/images/hero/your-hero-image.jpg',
   };

   // For amenity images (object)
   export const amenityImages = {
     pool: 'https://images.unsplash.com/...',
     restaurant: '/assets/images/amenities/restaurant.jpg',
   };

   // For local images (object)
   export const localImages = {
     whatsapp: '/assets/images/gallery/whatsapp-image.jpg',
     logo: '/assets/images/logo/logo.png',
   };
   ```

### 2. Adding External Images

Simply add the URL to the appropriate array or object in `config/images.js`:

```javascript
export const galleryImages = [
  'https://images.unsplash.com/photo-1234567890',
  'https://your-external-image-url.com/image.jpg',
];
```

## Using Images in Components

### Basic Usage

```javascript
import { galleryImages, heroImages } from '../config/images';

// Use in component
<img src={heroImages.main} alt="Hero" />
{galleryImages.map((img, idx) => (
  <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
))}
```

### Using Utility Functions

```javascript
import { getGalleryPreview, getHeroImage, getRandomImages } from '../utils/imageUtils';

// Get first 3 gallery images for preview
const previewImages = getGalleryPreview(3);

// Get specific hero image
const heroImage = getHeroImage('main');

// Get random images
const randomImages = getRandomImages('gallery', 5);
```

## Image Categories

### 1. Hero Images (`heroImages`)
- **Type**: Object
- **Usage**: Main banner/hero images
- **Keys**: `main`, `secondary`, `tertiary`, etc.

### 2. Gallery Images (`galleryImages`)
- **Type**: Array
- **Usage**: Gallery page and preview sections
- **Access**: By index

### 3. Amenity Images (`amenityImages`)
- **Type**: Object
- **Usage**: Amenity cards and features
- **Keys**: `pool`, `spa`, `garden`, `beach`, etc.

### 4. Local Images (`localImages`)
- **Type**: Object
- **Usage**: Project-specific images
- **Keys**: `whatsapp`, `logo`, etc.

## Best Practices

### 1. Image Naming
- Use descriptive, lowercase names with hyphens
- Example: `pool-view-sunset.jpg`, `restaurant-interior.jpg`

### 2. Image Optimization
- Use appropriate file formats (JPEG for photos, PNG for graphics)
- Optimize file sizes for web use
- Consider using WebP format for better compression

### 3. External Images
- Use reliable image hosting services
- Consider image dimensions and quality parameters
- Use the `getOptimizedImageUrl` utility for external images

### 4. Responsive Images
- Use the utility functions to get different image sizes
- Consider using `srcset` for responsive images

## Utility Functions

The `utils/imageUtils.js` file provides several helpful functions:

- `getCategoryImages(category)` - Get all images from a category
- `getImageByKey(category, key)` - Get specific image by key
- `getRandomImages(category, count)` - Get random images
- `getGalleryPreview(count)` - Get gallery preview images
- `getHeroImage(type)` - Get hero image
- `getAmenityImages(types)` - Get amenity images
- `isLocalImage(url)` - Check if image is local
- `getOptimizedImageUrl(url, width, height)` - Get optimized URL

## Examples

### Adding a New Gallery Image

1. Save image as `assets/images/gallery/new-villa-view.jpg`
2. Update `config/images.js`:
   ```javascript
   export const galleryImages = [
     // existing images...
     '/assets/images/gallery/new-villa-view.jpg',
   ];
   ```
3. The image will automatically appear in both Home page preview and Gallery page

### Adding a New Hero Image

1. Save image as `assets/images/hero/sunset-view.jpg`
2. Update `config/images.js`:
   ```javascript
   export const heroImages = {
     main: 'https://images.unsplash.com/...',
     sunset: '/assets/images/hero/sunset-view.jpg',
   };
   ```
3. Use in component:
   ```javascript
   import { getHeroImage } from '../utils/imageUtils';
   const sunsetImage = getHeroImage('sunset');
   ```

## Migration from Old System

The old system used hardcoded image arrays in individual components. The new system:

1. ✅ Centralizes all image management
2. ✅ Makes images reusable across components
3. ✅ Provides utility functions for easy access
4. ✅ Organizes images by category
5. ✅ Supports both local and external images

All existing functionality is preserved while adding these new capabilities.
