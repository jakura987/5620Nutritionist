// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVpGDqkrMOVJROF3Th6YVJIsi13wjBt20",
  authDomain: "nourishme-1b34c.firebaseapp.com",
  projectId: "nourishme-1b34c",
  storageBucket: "nourishme-1b34c.appspot.com",
  messagingSenderId: "573227368883",
  appId: "1:573227368883:web:209e7ba5b7b46bfbf1cbc6",
  measurementId: "G-0TNZX1E8EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db };  // Export the Firestore database for use in other files
