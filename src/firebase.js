// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-blog-aab17.firebaseapp.com",
  projectId: "next-blog-aab17",
  storageBucket: "next-blog-aab17.firebasestorage.app",
  messagingSenderId: "252567634780",
  appId: "1:252567634780:web:14e9be19cf515110277799",
  measurementId: "G-0BPMZMZJFT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);