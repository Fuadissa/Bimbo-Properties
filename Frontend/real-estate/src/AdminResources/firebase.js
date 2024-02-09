// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFhQp7uDy0iI3fLpW_KStko0YJv17J4po",
  authDomain: "the-litvak-team.firebaseapp.com",
  projectId: "the-litvak-team",
  storageBucket: "the-litvak-team.appspot.com",
  messagingSenderId: "228261485494",
  appId: "1:228261485494:web:57b54869232d4ad0613f17",
  measurementId: "G-Q0YBNCTVH5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
