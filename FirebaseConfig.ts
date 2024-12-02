// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9740Lf7PS7J-n_cTPodvke0fdgcvNrCY",
  authDomain: "floradex-4b488.firebaseapp.com",
  projectId: "floradex-4b488",
  storageBucket: "floradex-4b488.firebasestorage.app",
  messagingSenderId: "602077370664",
  appId: "1:602077370664:web:ced5d840b1fa2adfd5981d"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);