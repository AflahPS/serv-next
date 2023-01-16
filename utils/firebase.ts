// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "hireone-374909.firebaseapp.com",
  projectId: "hireone-374909",
  storageBucket: "hireone-374909.appspot.com",
  messagingSenderId: "50500538141",
  appId: "1:50500538141:web:f42800c3c0e6082cb7dbf4",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
