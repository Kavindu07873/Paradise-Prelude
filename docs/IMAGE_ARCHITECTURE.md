# Image Architecture - Auto-Discovery System

## Overview

The Paradise Prelude project now features an **automatic image discovery system** that automatically finds, categorizes, and registers images from the `assets/images` folder structure.

## Key Features

✅ **Automatic Discovery**: Images are automatically found from the assets folder  
✅ **Auto-Categorization**: Images are categorized by folder location  
✅ **Auto-Display**: New images automatically appear in Gallery and Home preview  
✅ **No Manual Configuration**: Just add images to the correct folder!  
✅ **Fallback Support**: Falls back to external URLs if no local images found  

## Architecture

### Folder Structure

```
assets/
└── images/
    ├── gallery/          → Automatically appears in Gallery page & Home preview
    ├── hero/             → Used for hero/banner sections
    ├── backgrounds/      → Available for background usage
    ├── amenities/        → Matched by filename (e.g., pool.jpg → amenityImages.pool)
    └── logo/             → Logo and branding images
```

### How It Works

1. **Discovery**: Uses Vite's `import.meta.glob` to scan `assets/images/**/*.{jpg,jpeg,png,webp,gif,svg}`
2. **Categorization**: Images are categorized based on their folder path
3. **Registration**: Images are automatically registered in the config
4. **Display**: Images automatically appear in components that use them

## Usage

### Adding Gallery Images

1. Place image in `assets/images/gallery/`
2. Restart dev server (or wait for HMR)
3. Image automatically appears in:
   - Gallery page (`/gallery`)
   - Home page gallery preview slider

**No code changes needed!**

### Adding Other Image Types

- **Hero Images**: Place in `assets/images/hero/` → First image becomes `heroImages.main`
- **Background Images**: Place in `assets/images/backgrounds/` → Available in `backgroundImages` array
- **Amenity Images**: Place in `assets/images/amenities/` → Matched by filename
- **Logo Images**: Place in `assets/images/logo/` → First image becomes `logoImages.main`

## Configuration

### Main Config File: `config/images.js`

- Auto-discovers images using Vite's glob import
- Organizes images by category
- Provides fallback to external URLs
- Exports organized image collections

### Utility Functions: `utils/imageUtils.js`

- `getAllGalleryImages()` - Get all gallery images
- `getGalleryPreview(count)` - Get first N gallery images
- `getHeroImage(type)` - Get specific hero image
- `getBackgroundImages()` - Get all background images
- `getImageStats()` - Get image statistics

## Components

### Gallery.jsx
- Uses `galleryImages` from config
- Automatically displays all discovered gallery images
- No changes needed - works automatically!

### Home.jsx
- Uses `galleryImages` for gallery preview slider
- Uses `heroImages.main` for hero banner
- No changes needed - works automatically!

## Benefits

1. **Zero Configuration**: Just add images to folders
2. **Automatic Updates**: New images appear automatically
3. **Organized Structure**: Images organized by purpose
4. **Type Safety**: Images are properly typed and categorized
5. **Performance**: Vite optimizes images automatically
6. **Maintainability**: Clear folder structure makes it easy to manage

## Migration

The new system is **backward compatible** with existing code:
- Existing components continue to work
- Same exports and function signatures
- No breaking changes

## Troubleshooting

**Images not appearing?**
- Check file is in correct folder
- Check file extension is supported
- Restart dev server
- Check browser console for errors

**Need manual configuration?**
- You can still manually add images to `config/images.js` if needed
- Manual entries take priority over auto-discovered images

## Documentation

- **Quick Guide**: `examples/add-new-image.md`
- **Full Documentation**: `docs/IMAGE_MANAGEMENT.md`
- **This File**: `docs/IMAGE_ARCHITECTURE.md`

## Summary

The new auto-discovery system makes managing images effortless:
- ✅ Add images to folders → They appear automatically
- ✅ No manual configuration needed
- ✅ Works with existing code
- ✅ Hot reload support in development

