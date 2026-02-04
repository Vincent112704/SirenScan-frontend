// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXyON0BBaA2jvWG_F6Nr5K9aIzCgvOmxU",
  authDomain: "cs38-50ed1.firebaseapp.com",
  projectId: "cs38-50ed1",
  storageBucket: "cs38-50ed1.firebasestorage.app",
  messagingSenderId: "1067136707772",
  appId: "1:1067136707772:web:91fa5aaef9eec756d9f4b9",
  measurementId: "G-TXHBLXH746"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)