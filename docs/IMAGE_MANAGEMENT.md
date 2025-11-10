# Image Management System - Auto-Discovery Architecture

This document explains the automatic image discovery system for the Paradise Prelude project.

## Overview

The project now uses an **automatic image discovery system** that:
- ✅ **Automatically finds** all images in the `assets/images` folder structure
- ✅ **Categorizes images** based on their folder location
- ✅ **Automatically displays** new images in the Gallery page and Home page preview
- ✅ **No manual configuration needed** - just add images to the correct folder!

## Architecture

### Folder Structure

```
assets/
└── images/
    ├── gallery/          # Gallery images (auto-appears in Gallery page & Home preview)
    ├── hero/             # Hero/banner images (for main banner sections)
    ├── backgrounds/      # Background images (for page backgrounds)
    ├── amenities/        # Amenity images (for amenity cards)
    └── logo/             # Logo and branding images
```

### How It Works

1. **Automatic Discovery**: The system uses Vite's `import.meta.glob` to automatically scan the `assets/images` folder structure
2. **Categorization**: Images are automatically categorized based on their folder location
3. **Auto-Registration**: New images are automatically registered and available throughout the application
4. **Fallback Support**: If no local images are found, the system falls back to external URLs

## Adding New Images

### Quick Start: Adding Gallery Images

**To add a new gallery image:**

1. **Place your image** in `assets/images/gallery/`
   ```
   assets/images/gallery/my-new-image.jpg
   ```

2. **That's it!** The image will automatically:
   - ✅ Appear in the Gallery page (`/gallery`)
   - ✅ Appear in the Home page gallery preview slider
   - ✅ Be available throughout the application

**No code changes needed!** Just add the file and restart the dev server.

### Adding Other Image Types

#### Hero Images
```
assets/images/hero/sunset-view.jpg
```
- Automatically available as `heroImages.sunset-view` or `heroImages.hero-1`, etc.
- First hero image becomes `heroImages.main` (used in Home page banner)

#### Background Images
```
assets/images/backgrounds/page-background.jpg
```
- Available in `backgroundImages` array
- Use with `getBackgroundImages()` utility function

#### Amenity Images
```
assets/images/amenities/pool.jpg
assets/images/amenities/spa.jpg
```
- Automatically matched by filename (e.g., `pool.jpg` → `amenityImages.pool`)
- Available in `amenityImages` object

#### Logo Images
```
assets/images/logo/main-logo.png
```
- First logo becomes `logoImages.main`
- Additional logos available as `logoImages.logo-1`, etc.

## Supported Image Formats

The system automatically discovers images in these formats:
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`
- `.svg`

## Using Images in Components

### Gallery Images

```javascript
import { galleryImages } from '../config/images';

// All gallery images (automatically includes all images from assets/images/gallery/)
{galleryImages.map((img, idx) => (
  <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
))}
```

### Hero Images

```javascript
import { heroImages } from '../config/images';

// Main hero image (first image from assets/images/hero/ or fallback)
<img src={heroImages.main} alt="Hero" />
```

### Using Utility Functions

```javascript
import { 
  getAllGalleryImages, 
  getGalleryPreview, 
  getHeroImage,
  getBackgroundImages 
} from '../utils/imageUtils';

// Get all gallery images
const allImages = getAllGalleryImages();

// Get first 3 gallery images for preview
const previewImages = getGalleryPreview(3);

// Get hero image
const heroImage = getHeroImage('main');

// Get background images
const backgrounds = getBackgroundImages();
```

## Image Organization Best Practices

### 1. Naming Conventions

**Recommended naming:**
- Use lowercase letters
- Use hyphens for word separation
- Be descriptive
- Examples:
  - ✅ `villa-sunset-view.jpg`
  - ✅ `pool-daytime.jpg`
  - ✅ `restaurant-interior.jpg`
  - ❌ `IMG_1234.jpg` (not descriptive)
  - ❌ `My Image.png` (spaces and capitals)

### 2. File Organization

**Gallery Images:**
- Place all gallery images in `assets/images/gallery/`
- No subfolders needed (but supported)
- Images are sorted alphabetically

**Hero Images:**
- Place hero images in `assets/images/hero/`
- First image becomes the main hero image
- Additional images available by filename or index

**Background Images:**
- Place background images in `assets/images/backgrounds/`
- Use for page backgrounds, section backgrounds, etc.

### 3. Image Optimization

**Before adding images:**
- ✅ Optimize file sizes for web use
- ✅ Use appropriate formats (JPEG for photos, PNG for graphics)
- ✅ Consider using WebP for better compression
- ✅ Recommended max file size: 500KB per image
- ✅ Recommended dimensions: 1920x1080 for hero images, 1200x800 for gallery

## Automatic Features

### 1. Auto-Discovery
- Images are automatically discovered on build/dev server start
- No manual registration needed
- Works with hot module replacement (HMR) in development

### 2. Auto-Categorization
- Images are automatically categorized by folder location
- Gallery images → `galleryImages` array
- Hero images → `heroImages` object
- Background images → `backgroundImages` array
- Amenity images → `amenityImages` object
- Logo images → `logoImages` object

### 3. Auto-Display
- Gallery images automatically appear in:
  - Gallery page (`/gallery`)
  - Home page gallery preview slider
- Hero images automatically available for banner sections
- Background images available for background usage

## Configuration File

The main configuration is in `config/images.js`:

```javascript
// Auto-discovered images
export const galleryImages = [
  // All images from assets/images/gallery/ are automatically included
  // Fallback external images only used if no local images found
];

export const heroImages = {
  main: discoveredImages.hero[0] || fallbackUrl,
  // Additional hero images...
};
```

## Utility Functions

Available in `utils/imageUtils.js`:

| Function | Description |
|----------|-------------|
| `getAllGalleryImages()` | Get all gallery images |
| `getGalleryPreview(count)` | Get first N gallery images for preview |
| `getHeroImage(type)` | Get specific hero image |
| `getBackgroundImages()` | Get all background images |
| `getImageStats()` | Get statistics about discovered images |
| `hasImages(category)` | Check if category has images |
| `isLocalImage(url)` | Check if image is local |

## Troubleshooting

### Images Not Appearing?

1. **Check file location**: Ensure images are in the correct folder (`assets/images/gallery/`, etc.)
2. **Check file format**: Ensure file extension is supported (`.jpg`, `.png`, `.webp`, etc.)
3. **Restart dev server**: Auto-discovery happens on server start
4. **Check console**: Look for any error messages in the browser console

### Images Not Categorized Correctly?

- Ensure images are in the correct folder:
  - Gallery images → `assets/images/gallery/`
  - Hero images → `assets/images/hero/`
  - Background images → `assets/images/backgrounds/`
  - Amenity images → `assets/images/amenities/`
  - Logo images → `assets/images/logo/`

### Fallback Images Showing?

- If you see fallback external images, it means no local images were found
- Add images to the appropriate folder and restart the dev server
- Local images take priority over fallback images

## Examples

### Example 1: Adding a New Gallery Image

1. Save image as `assets/images/gallery/villa-pool-view.jpg`
2. Restart dev server (or wait for HMR)
3. Image automatically appears in:
   - Gallery page
   - Home page gallery preview

### Example 2: Adding a New Hero Image

1. Save image as `assets/images/hero/sunset-banner.jpg`
2. Restart dev server
3. Use in component:
   ```javascript
   import { heroImages } from '../config/images';
   <img src={heroImages['sunset-banner']} alt="Sunset" />
   ```

### Example 3: Adding Multiple Gallery Images

1. Add multiple images to `assets/images/gallery/`:
   - `villa-exterior-1.jpg`
   - `villa-exterior-2.jpg`
   - `villa-interior-1.jpg`
   - `villa-interior-2.jpg`
2. All images automatically appear in Gallery and Home preview
3. Images are sorted alphabetically

## Migration from Old System

If you were using the old manual system:

1. **Old way** (manual):
   ```javascript
   export const galleryImages = [
     '/assets/images/gallery/image1.jpg',
     '/assets/images/gallery/image2.jpg',
   ];
   ```

2. **New way** (automatic):
   - Just place images in `assets/images/gallery/`
   - They're automatically discovered!

**No code changes needed** - the new system is backward compatible with existing code.

## Advanced Usage

### Getting Image Statistics

```javascript
import { getImageStats } from '../utils/imageUtils';

const stats = getImageStats();
console.log(stats);
// {
//   gallery: 10,
//   hero: 2,
//   backgrounds: 5,
//   amenities: 8,
//   logo: 1,
//   total: 26
// }
```

### Checking if Images Exist

```javascript
import { hasImages } from '../utils/imageUtils';

if (hasImages('gallery')) {
  // Gallery images are available
}
```

## Summary

✅ **Just add images to the correct folder** → They automatically appear everywhere!

✅ **No manual configuration** → The system handles everything automatically

✅ **Works with existing code** → Backward compatible with current components

✅ **Hot reload support** → Changes appear immediately in development

The new auto-discovery system makes managing images effortless - just organize them in folders and they're automatically available throughout your application!
