// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // ADD THIS
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3BSaH6KT3s6dHKV-ZmA-uX_rd1KKJLJE",
  authDomain: "real-es-f854c.firebaseapp.com",
  projectId: "real-es-f854c",
  storageBucket: "real-es-f854c.firebasestorage.app",
  messagingSenderId: "180601135685",
  appId: "1:180601135685:web:03890751360090d3c9792c",
  measurementId: "G-QCXDBT0THB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);           // ADD THIS LINE
const analytics = getAnalytics(app);

export default app;