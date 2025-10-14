# Example: Adding a New Image to Paradise Prelude

This example shows how to add a new image to your project using the centralized image management system.

## Scenario
You want to add a new villa interior photo to the gallery.

## Step 1: Add the Image File
1. Save your image file as `villa-interior.jpg`
2. Place it in the `assets/images/gallery/` folder
3. Your file structure should look like:
   ```
   assets/images/gallery/
   ├── whatsapp-image.jpg
   └── villa-interior.jpg  ← Your new image
   ```

## Step 2: Update the Configuration
Open `config/images.js` and add your image to the gallery array:

```javascript
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
  '/assets/images/gallery/villa-interior.jpg',  // ← Add this line
];
```

## Step 3: That's It!
Your new image will automatically appear in:
- ✅ Home page gallery preview section
- ✅ Gallery page full gallery
- ✅ Any other component that uses `galleryImages`

## Alternative: Using Utility Functions
You can also add images programmatically using the utility functions:

```javascript
import { addImage } from '../utils/imageUtils';

// Add to gallery (array-based category)
addImage('gallery', '/assets/images/gallery/villa-interior.jpg');

// Add to hero images (object-based category)
addImage('hero', '/assets/images/hero/new-hero.jpg', 'secondary');
```

## Testing Your Changes
1. Start your development server: `npm run dev`
2. Navigate to the Home page - you should see your image in the gallery preview
3. Navigate to the Gallery page - you should see your image in the full gallery
4. Click on your image to test the lightbox functionality

## Tips
- Use descriptive filenames: `villa-interior-daylight.jpg` instead of `img1.jpg`
- Optimize your images for web use (compress file size)
- Consider using WebP format for better performance
- For external images, use the `getOptimizedImageUrl` utility to add size parameters
