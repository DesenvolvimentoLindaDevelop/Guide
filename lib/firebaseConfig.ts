import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase Storage CORS configuration
// This needs to be set in the Firebase Console as well
// Go to Firebase Console > Storage > Rules and add CORS configuration

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getFirestore(app);

// Initialize storage with custom settings
// Note: For this to work properly, you must also configure CORS in the Firebase Console:
// 1. Go to Firebase Console > Storage
// 2. Create a cors.json file with the following content:
// [
//   {
//     "origin": ["https://guide-eight-taupe.vercel.app"],
//     "method": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
//     "maxAgeSeconds": 3600
//   }
// ]
// 3. Use the Firebase CLI to apply the CORS configuration:
//    firebase storage:cors update --project YOUR_PROJECT_ID cors.json
const storage = getStorage(app);
const auth = getAuth(app);

export { database, storage, auth }
