// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC9gyRspzzhcgxI6eLCqF_N-L4V7d9Sok",
  authDomain: "dentcare-d21e5.firebaseapp.com",
  projectId: "dentcare-d21e5",
  storageBucket: "dentcare-d21e5.appspot.com",
  messagingSenderId: "678305253681",
  appId: "1:678305253681:web:30eb1fd3571c60a05f8810",
  measurementId: "G-P6ZW1VY7LE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
