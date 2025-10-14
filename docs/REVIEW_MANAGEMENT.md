# Review Management System

This document explains how to manage reviews in the Paradise Prelude project.

## Overview

The project now uses a centralized review management system that makes it easy to:
- Display the same reviews on both Home page and Reviews page
- Allow visitors to add new reviews with name, message, and star rating
- Store reviews locally in the browser
- Manage review statistics and analytics

## File Structure

```
config/
└── reviews.js           # Centralized review configuration and storage
components/
└── ReviewForm.jsx       # Review submission form component
utils/
└── reviewUtils.js       # Review utility functions
pages/
├── Home.jsx            # Uses centralized reviews for preview
└── Reviews.jsx         # Full reviews page with form
```

## Features

### 1. Centralized Review Storage
- All reviews are stored in `localStorage` for persistence
- Reviews are shared between Home page and Reviews page
- Default reviews are provided if no reviews exist

### 2. Review Submission Form
- Interactive star rating system
- Name and message validation
- Real-time form validation
- Success/error messaging

### 3. Review Statistics
- Average rating calculation
- Total review count
- Rating distribution
- Recent reviews tracking

### 4. Review Display
- Carousel format on Reviews page
- Preview format on Home page
- Responsive design
- Smooth animations

## Adding New Reviews

### Programmatically
```javascript
import { addReview } from '../config/reviews';

const newReview = addReview({
  name: 'John Doe',
  text: 'Amazing experience! The villa was perfect.',
  rating: 5
});
```

### Through the Form
1. Navigate to the Reviews page
2. Click "Write a Review" button
3. Fill in the form:
   - **Name**: Your name (minimum 2 characters)
   - **Rating**: Click stars to rate (1-5 stars)
   - **Review**: Your review text (minimum 10 characters)
4. Click "Submit Review"

## Review Data Structure

```javascript
{
  id: 1234567890,           // Unique ID (timestamp)
  name: 'John Doe',         // Reviewer name
  text: 'Great stay!',      // Review text
  rating: 5,                // Star rating (1-5)
  date: '2024-01-15',       // Review date (YYYY-MM-DD)
  verified: false           // Verification status
}
```

## Using Reviews in Components

### Home Page (Preview)
```javascript
import { getReviewsPreview } from '../config/reviews';

const Home = () => {
  const reviews = getReviewsPreview(6); // Get first 6 reviews
  // Use reviews in component...
};
```

### Reviews Page (Full List)
```javascript
import { getReviewsForPage } from '../config/reviews';

const Reviews = () => {
  const reviews = getReviewsForPage(); // Get all reviews
  // Use reviews in component...
};
```

### Using Utility Functions
```javascript
import { getReviewStats, getTopRatedReviews } from '../utils/reviewUtils';

// Get review statistics
const stats = getReviewStats();
console.log(stats.averageRating); // 4.8
console.log(stats.totalReviews);  // 25

// Get top rated reviews
const topReviews = getTopRatedReviews(3);
```

## Review Management Functions

### Core Functions (`config/reviews.js`)
- `getAllReviews()` - Get all reviews
- `addReview(reviewData)` - Add a new review
- `getReviewsPreview(count)` - Get reviews for preview
- `getReviewsForPage()` - Get all reviews for reviews page
- `getAverageRating()` - Calculate average rating
- `getRatingDistribution()` - Get rating distribution
- `deleteReview(id)` - Delete a review (admin)
- `updateReview(id, updates)` - Update a review (admin)

### Utility Functions (`utils/reviewUtils.js`)
- `getFormattedReviews(limit)` - Get formatted reviews
- `formatDate(dateString)` - Format date for display
- `getRatingText(rating)` - Get rating description
- `getInitials(name)` - Get name initials
- `validateReview(reviewData)` - Validate review data
- `submitReview(reviewData)` - Submit and validate review
- `searchReviews(term)` - Search reviews by text
- `getRecentReviews(days)` - Get recent reviews
- `getTopRatedReviews(count)` - Get top rated reviews

## Review Form Component

The `ReviewForm` component provides:
- Interactive star rating
- Form validation
- Loading states
- Success/error messaging
- Responsive design

### Usage
```javascript
import ReviewForm from '../components/ReviewForm';

const Reviews = () => {
  const handleReviewAdded = (newReview) => {
    // Handle new review
    console.log('New review added:', newReview);
  };

  return (
    <ReviewForm onReviewAdded={handleReviewAdded} />
  );
};
```

## Review Statistics

The system automatically calculates:
- **Average Rating**: Overall average of all reviews
- **Total Reviews**: Count of all reviews
- **Rating Distribution**: Count of reviews by rating (1-5 stars)
- **Percentage by Rating**: Percentage breakdown by rating
- **Recent Reviews**: Latest reviews for display

## Data Persistence

Reviews are stored in `localStorage` with the key `paradise_prelude_reviews`:
- Persists across browser sessions
- Automatically loads on page refresh
- Falls back to default reviews if no data exists

## Validation Rules

### Name Validation
- Minimum 2 characters
- Required field
- Trimmed whitespace

### Review Text Validation
- Minimum 10 characters
- Maximum 500 characters
- Required field
- Trimmed whitespace

### Rating Validation
- Must be between 1 and 5
- Required field
- Integer value

## Best Practices

### 1. Review Content
- Encourage detailed, helpful reviews
- Moderate inappropriate content
- Respond to reviews when possible

### 2. User Experience
- Make the review process simple
- Provide clear validation messages
- Show review statistics prominently

### 3. Data Management
- Regularly backup review data
- Consider implementing review moderation
- Monitor review quality and authenticity

## Migration from Old System

The old system used hardcoded review arrays in individual components. The new system:

1. ✅ Centralizes all review management
2. ✅ Makes reviews reusable across components
3. ✅ Provides user review submission
4. ✅ Includes review statistics
5. ✅ Persists data in localStorage
6. ✅ Provides utility functions for easy access

All existing functionality is preserved while adding these new capabilities.

## Future Enhancements

Potential improvements for the review system:
- Review moderation and approval
- Review responses from management
- Review filtering and sorting
- Export review data
- Review analytics dashboard
- Email notifications for new reviews
- Review photo attachments
- Review helpfulness voting
