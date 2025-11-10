// Firebase configuration for Paradise Prelude
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaad-uWOlEJ6ewfjdBnbNmfVfcVBnyAa8",
  authDomain: "paradise-prelude-villa.firebaseapp.com",
  projectId: "paradise-prelude-villa",
  storageBucket: "paradise-prelude-villa.firebasestorage.app",
  messagingSenderId: "946943454709",
  appId: "1:946943454709:web:8591d5c18c530cfc93c4bc",
  measurementId: "G-T12Y1BWQMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;

