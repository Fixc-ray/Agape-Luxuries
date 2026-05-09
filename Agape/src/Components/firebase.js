// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA0PBxrWh3wE3y3TReVtHv67gD1iQazC0",
  authDomain: "agape-df356.firebaseapp.com",
  projectId: "agape-df356",
  storageBucket: "agape-df356.firebasestorage.app",
  messagingSenderId: "274616836060",
  appId: "1:274616836060:web:1ec8a8285c8318b215f919",
  measurementId: "G-BC67NHXK57"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

