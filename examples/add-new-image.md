# Quick Guide: Adding New Images

This guide shows you how to add new images to your Paradise Prelude project.

## Adding Gallery Images (Most Common)

### Step 1: Place Your Image

Save your image file in the gallery folder:
```
assets/images/gallery/your-image-name.jpg
```

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`

### Step 2: Restart Dev Server (if needed)

If your dev server is running, it should automatically pick up the new image. If not, restart it:
```bash
npm run dev
```

### Step 3: Done! 🎉

Your image will automatically appear in:
- ✅ Gallery page (`/gallery`)
- ✅ Home page gallery preview slider

**No code changes needed!**

## Adding Other Image Types

### Hero Images

1. Place image in `assets/images/hero/`
2. First image becomes the main hero (used in Home page banner)
3. Use in code:
   ```javascript
   import { heroImages } from '../config/images';
   <img src={heroImages.main} alt="Hero" />
   ```

### Background Images

1. Place image in `assets/images/backgrounds/`
2. Use in code:
   ```javascript
   import { getBackgroundImages } from '../utils/imageUtils';
   const backgrounds = getBackgroundImages();
   ```

### Amenity Images

1. Place image in `assets/images/amenities/`
2. Name should match amenity type (e.g., `pool.jpg`, `spa.jpg`)
3. Use in code:
   ```javascript
   import { amenityImages } from '../config/images';
   <img src={amenityImages.pool} alt="Pool" />
   ```

### Logo Images

1. Place image in `assets/images/logo/`
2. First logo becomes `logoImages.main`
3. Use in code:
   ```javascript
   import { logoImages } from '../config/images';
   <img src={logoImages.main} alt="Logo" />
   ```

## Image Naming Best Practices

✅ **Good names:**
- `villa-sunset-view.jpg`
- `pool-daytime.jpg`
- `restaurant-interior.jpg`
- `bedroom-suite-1.jpg`

❌ **Avoid:**
- `IMG_1234.jpg` (not descriptive)
- `My Image.png` (spaces and capitals)
- `image1.jpg` (not descriptive)

## Tips

1. **Optimize before adding**: Compress images to reduce file size (aim for < 500KB)
2. **Use descriptive names**: Makes it easier to find images later
3. **Consistent naming**: Use lowercase with hyphens for consistency
4. **Organize by purpose**: Use the folder structure to organize images

## Troubleshooting

**Image not showing?**
- Check file is in correct folder
- Check file extension is supported
- Restart dev server
- Check browser console for errors

**Need help?**
- See `docs/IMAGE_MANAGEMENT.md` for detailed documentation
- Check `config/images.js` for configuration details
