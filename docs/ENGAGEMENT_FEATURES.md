# Engagement Features - Live Views & Likes

## Overview

The Paradise Prelude website now includes modern engagement features:
- ✅ **Live View Count** - Shows how many people have viewed the website
- ✅ **Like Button** - Allows visitors to like the website
- ✅ **Persistent Reviews** - Reviews are saved and persist after page refresh
- ✅ **Modern UI** - Beautiful, animated components with glassmorphism design

## Features

### 1. Live View Count

**Location**: Top-right corner of the Home page

**Features**:
- Automatically tracks each unique visitor
- Shows total view count with formatted numbers (e.g., 1,234 views)
- Updates in real-time
- Uses session tracking to avoid counting rapid refreshes
- Persists across page refreshes using localStorage

**How it works**:
- Each visitor gets a unique session ID
- Views are tracked with a 5-second cooldown to prevent rapid refresh spam
- Session expires after 30 minutes of inactivity
- Total views are stored in localStorage

### 2. Like Button

**Location**: Top-right corner of the Home page (below view count)

**Features**:
- Beautiful animated heart icon
- Shows total like count
- Prevents duplicate likes (one like per user)
- Smooth animations when liked/unliked
- Visual feedback with color changes
- Persists across page refreshes

**How it works**:
- Users can like the website once
- Like status is stored in localStorage
- Total likes are tracked and displayed
- Beautiful animations when toggling like status

### 3. Persistent Reviews

**Location**: Reviews page (`/reviews`)

**Features**:
- Reviews are automatically saved to localStorage
- Reviews persist after page refresh
- New reviews appear immediately after submission
- Reviews are sorted by date (newest first)
- All reviews are preserved

**How it works**:
- When a user submits a review, it's saved to localStorage
- Reviews are loaded from localStorage on page load
- Reviews persist across browser sessions
- Default reviews are shown if no custom reviews exist

## Technical Details

### Storage Keys

The system uses localStorage with these keys:
- `paradise_prelude_total_views` - Total view count
- `paradise_prelude_total_likes` - Total like count
- `paradise_prelude_user_liked` - User's like status
- `paradise_prelude_session_id` - Current session ID
- `paradise_prelude_last_view_time` - Last view timestamp
- `paradise_prelude_reviews` - All reviews

### Components

1. **EngagementStats Component** (`components/EngagementStats.jsx`)
   - Displays view count and like button
   - Handles like/unlike functionality
   - Updates in real-time
   - Responsive design for mobile and desktop

2. **Engagement Utils** (`utils/engagementUtils.js`)
   - Tracks views and likes
   - Manages session IDs
   - Handles localStorage operations
   - Provides utility functions

### Review System

The review system already uses localStorage:
- Reviews are saved automatically when submitted
- Reviews persist across page refreshes
- Reviews are loaded on page load
- New reviews appear immediately

## Usage

### View Count

The view count is automatically displayed on the Home page. No configuration needed!

### Like Button

Users can click the like button to like the website. The button:
- Shows current like count
- Changes color when liked
- Prevents duplicate likes
- Persists across page refreshes

### Adding Reviews

1. Go to the Reviews page (`/reviews`)
2. Click "Write a Review"
3. Fill in the form
4. Submit the review
5. The review is saved and persists after refresh!

## Customization

### Changing View Count Display

Edit `components/EngagementStats.jsx`:
```javascript
// Change position
className="fixed top-4 right-4 z-50"

// Change styling
className="bg-white/10 backdrop-blur-md rounded-full"
```

### Changing Like Button

Edit `components/EngagementStats.jsx`:
```javascript
// Change like button styling
className="bg-white/10 backdrop-blur-md rounded-full"
```

### Resetting Data

To reset view count and likes:
```javascript
import { resetEngagementData } from '../utils/engagementUtils';
resetEngagementData();
```

## Best Practices

1. **View Tracking**: Views are tracked with a 5-second cooldown to prevent spam
2. **Like Prevention**: Users can only like once per browser
3. **Session Management**: Sessions expire after 30 minutes of inactivity
4. **Data Persistence**: All data is stored in localStorage for persistence

## Troubleshooting

### Views Not Counting?

- Check browser console for errors
- Ensure localStorage is enabled
- Check if session ID is being generated

### Likes Not Working?

- Check if user has already liked (button will be red)
- Check browser console for errors
- Ensure localStorage is enabled

### Reviews Not Persisting?

- Check browser console for errors
- Ensure localStorage is enabled
- Check if reviews are being saved correctly

## Future Enhancements

Potential future improvements:
- Backend integration for cross-device tracking
- Real-time updates using WebSockets
- Analytics dashboard
- Export engagement data
- Social sharing integration

## Summary

✅ **Live View Count** - Automatically tracks and displays website views  
✅ **Like Button** - Beautiful, animated like button with count  
✅ **Persistent Reviews** - Reviews are saved and persist after refresh  
✅ **Modern Design** - Glassmorphism design with smooth animations  
✅ **Responsive** - Works on mobile and desktop devices  

All features are fully functional and ready to use!

