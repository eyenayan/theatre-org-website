// Import Firebase functions from the modular SDK
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendEmailVerification 
} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Firebase configuration object (replace with your own credentials if needed)
const firebaseConfig = {
  apiKey: "AIzaSyCn5obu8X6P_NqshHx5fF9yqWFnLe6G8c8",
  authDomain: "cs-x-nv.firebaseapp.com",
  projectId: "cs-x-nv",
  storageBucket: "cs-x-nv.appspot.com", // Corrected the storageBucket URL
  messagingSenderId: "962513014320",
  appId: "1:962513014320:web:0eb810d6b8781382cb27f5"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore database
const googleProvider = new GoogleAuthProvider(); // Google Authentication Provider

// Export initialized Firebase services and necessary methods
export const functions = getFunctions();

export { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  googleProvider, 
  sendEmailVerification, 
  db // Export Firestore database
};
