# Firebase Setup Guide

This guide explains how to set up Firebase Firestore for the Paradise Prelude project.

## Prerequisites

1. Firebase project created at [Firebase Console](https://console.firebase.google.com/)
2. Firebase configuration added to `config/firebase.js`
3. Firestore database enabled in Firebase Console

## Firestore Database Setup

### Step 1: Enable Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `paradise-prelude-villa`
3. Click on "Firestore Database" in the left sidebar
4. Click "Create database"
5. Choose "Start in test mode" (for development) or "Start in production mode" (for production)
6. Select a location for your database
7. Click "Enable"

### Step 2: Set Up Firestore Security Rules

Go to Firestore Database → Rules and add the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Engagement stats - read allowed, write only for increment operations
    match /engagement/{document} {
      allow read: if true;
      allow write: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['totalViews', 'totalLikes', 'lastUpdated']);
    }
    
    // Reviews - read allowed, write allowed for authenticated users or public
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name', 'text', 'rating', 'date', 'verified', 'createdAt'])
        && request.resource.data.name is string
        && request.resource.data.text is string
        && request.resource.data.rating is int
        && request.resource.data.rating >= 1
        && request.resource.data.rating <= 5;
      allow update, delete: if false; // Only admins can update/delete (set up authentication later)
    }
    
    // Views tracking - read allowed, write allowed for session tracking
    match /views/{sessionId} {
      allow read: if true;
      allow write: if request.resource.data.keys().hasAll(['sessionId', 'timestamp', 'counted']);
    }
  }
}
```

**For Production**, you should:
- Set up Firebase Authentication
- Restrict write access to authenticated users
- Add admin roles for review management

### Step 3: Create Collections

The following collections will be created automatically when the app runs:

1. **`engagement`** - Stores view count and like count
   - Document ID: `stats`
   - Fields: `totalViews` (number), `totalLikes` (number), `lastUpdated` (timestamp)

2. **`reviews`** - Stores user reviews
   - Document ID: Auto-generated
   - Fields: `name` (string), `text` (string), `rating` (number), `date` (string), `verified` (boolean), `createdAt` (timestamp)

3. **`views`** - Tracks view sessions
   - Document ID: Session ID
   - Fields: `sessionId` (string), `timestamp` (timestamp), `counted` (boolean)

## Testing the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your website in a browser

3. Check Firebase Console → Firestore Database to see if data is being created:
   - Visit the home page - should create/update `engagement/stats`
   - Like the website - should increment `totalLikes` in `engagement/stats`
   - Submit a review - should create a document in `reviews` collection

## Troubleshooting

### Error: "Missing or insufficient permissions"

- Check Firestore security rules
- Ensure rules allow read/write operations
- For development, you can temporarily use:
  ```javascript
  allow read, write: if true;
  ```
  **Warning**: Only use this for development! Never use in production.

### Error: "Firestore is not initialized"

- Check `config/firebase.js` has correct Firebase configuration
- Ensure Firestore is enabled in Firebase Console
- Check browser console for detailed error messages

### Views/Likes Not Updating

- Check browser console for errors
- Verify Firestore rules allow write operations
- Check network tab to see if Firebase requests are being made
- Ensure Firebase project is correctly configured

### Reviews Not Saving

- Check Firestore rules allow create operations
- Verify review data structure matches expected format
- Check browser console for validation errors

## Production Considerations

1. **Security Rules**: Set up proper authentication and restrict write access
2. **Indexes**: Create indexes for queries if needed
3. **Backup**: Set up regular backups of Firestore data
4. **Monitoring**: Enable Firebase monitoring and alerts
5. **Rate Limiting**: Consider implementing rate limiting for writes

## Firebase Console Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Database](https://console.firebase.google.com/project/paradise-prelude-villa/firestore)
- [Firestore Rules](https://console.firebase.google.com/project/paradise-prelude-villa/firestore/rules)
- [Firebase Analytics](https://console.firebase.google.com/project/paradise-prelude-villa/analytics)

## Next Steps

1. Set up Firebase Authentication for user management
2. Create admin panel for review management
3. Set up Firebase Cloud Functions for advanced features
4. Configure Firebase Hosting for deployment

## Support

For issues or questions:
- Check [Firebase Documentation](https://firebase.google.com/docs)
- Check browser console for error messages
- Verify Firestore rules are correctly configured

