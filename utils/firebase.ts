import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "hireone-374909.firebaseapp.com",
  projectId: "hireone-374909",
  storageBucket: "hireone-374909.appspot.com",
  messagingSenderId: "50500538141",
  appId: "1:50500538141:web:f42800c3c0e6082cb7dbf4",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const facebookAuth = new FacebookAuthProvider();
