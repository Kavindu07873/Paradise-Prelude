# Example: Using the Review Management System

This example shows how to use the new centralized review management system in Paradise Prelude.

## Scenario
You want to understand how the review system works and how to add new reviews.

## How It Works

### 1. Same Reviews Everywhere
Both the Home page and Reviews page now use the same review data:
- **Home page**: Shows a preview of the first 6 reviews
- **Reviews page**: Shows all reviews with statistics and submission form

### 2. Adding New Reviews
Users can add reviews through the Reviews page:

1. **Navigate to Reviews page**
2. **Click "Write a Review" button**
3. **Fill out the form**:
   - Enter your name
   - Click stars to rate (1-5 stars)
   - Write your review (minimum 10 characters)
4. **Click "Submit Review"**
5. **Review appears immediately** on both pages

### 3. Review Statistics
The Reviews page shows:
- **Average Rating**: Overall average of all reviews
- **Total Reviews**: Count of all reviews
- **5-Star Reviews**: Count of 5-star reviews

## Code Examples

### Getting Reviews for Display
```javascript
// Get reviews for Home page preview
import { getReviewsPreview } from '../config/reviews';
const homeReviews = getReviewsPreview(6);

// Get all reviews for Reviews page
import { getReviewsForPage } from '../config/reviews';
const allReviews = getReviewsForPage();
```

### Adding a Review Programmatically
```javascript
import { addReview } from '../config/reviews';

const newReview = addReview({
  name: 'John Doe',
  text: 'Amazing villa with beautiful ocean views!',
  rating: 5
});
```

### Getting Review Statistics
```javascript
import { getReviewStats } from '../utils/reviewUtils';

const stats = getReviewStats();
console.log(`Average rating: ${stats.averageRating}`);
console.log(`Total reviews: ${stats.totalReviews}`);
```

## Review Data Structure
Each review contains:
```javascript
{
  id: 1234567890,                    // Unique ID
  name: 'John Doe',                  // Reviewer name
  text: 'Great experience!',         // Review text
  rating: 5,                         // Star rating (1-5)
  date: '2024-01-15',                // Review date
  verified: false                    // Verification status
}
```

## Form Validation
The review form validates:
- **Name**: Minimum 2 characters
- **Rating**: Must be 1-5 stars
- **Review Text**: Minimum 10 characters, maximum 500 characters

## Data Persistence
- Reviews are saved in browser's localStorage
- Reviews persist across browser sessions
- If no reviews exist, default reviews are shown

## Testing the System

1. **Start your development server**: `npm run dev`
2. **Navigate to Home page**: See review preview
3. **Navigate to Reviews page**: See all reviews and statistics
4. **Click "Write a Review"**: Test the form
5. **Submit a review**: See it appear on both pages
6. **Refresh the page**: Verify data persistence

## Features

### ✅ Centralized Management
- All reviews managed in one place
- Same data used across all pages

### ✅ User Submission
- Interactive review form
- Star rating system
- Form validation

### ✅ Statistics
- Average rating calculation
- Review count tracking
- Rating distribution

### ✅ Data Persistence
- Reviews saved in localStorage
- Survives browser restarts

### ✅ Responsive Design
- Works on all device sizes
- Smooth animations
- Modern UI

## Benefits

1. **Consistency**: Same reviews everywhere
2. **User Engagement**: Visitors can leave reviews
3. **Data Management**: Easy to manage and update
4. **Statistics**: Automatic calculation of metrics
5. **Persistence**: Reviews saved locally
6. **Scalability**: Easy to extend with new features

The review system is now fully functional and ready for use!
