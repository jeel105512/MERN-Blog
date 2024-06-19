// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-940a9.firebaseapp.com",
  projectId: "mern-blog-940a9",
  storageBucket: "mern-blog-940a9.appspot.com",
  messagingSenderId: "9972446585",
  appId: "1:9972446585:web:35efdfdeda1fa701aaaba8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
