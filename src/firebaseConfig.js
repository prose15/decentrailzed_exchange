// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEct-c9ME5dq3NmOT1vEClurEQmcnBEf0",
  authDomain: "exchanges-cb4e3.firebaseapp.com",
  projectId: "exchanges-cb4e3",
  storageBucket: "exchanges-cb4e3.appspot.com",
  messagingSenderId: "74116658843",
  appId: "1:74116658843:web:e7ff0c5bc24ca8a908f83e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)