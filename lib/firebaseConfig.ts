import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsLsQlvSFzdizAWM3jqtC5Poe7loWiYKU",
  authDomain: "guide-back.firebaseapp.com",
  projectId: "guide-back",
  storageBucket: "guide-back.firebasestorage.app",
  messagingSenderId: "74852991007",
  appId: "1:74852991007:web:7a3ad3a4ce98eec52d952a",
  measurementId: "G-V1TM2FT8KN"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { database, storage, auth }