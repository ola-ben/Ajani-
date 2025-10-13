// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCELfgRKcAaUeLnInsvenpXJRi2kSSwS3E", // ✅ Use your real API key
  authDomain: "ajani-vendors.firebaseapp.com",
  projectId: "ajani-vendors",
  storageBucket: "ajani-vendors.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
