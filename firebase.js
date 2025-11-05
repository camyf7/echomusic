// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD488EVLQXcIlqtnnJBmZ54SOGn-1X2GVs",
  authDomain: "echomusic-1-8735e.firebaseapp.com",
  projectId: "echomusic-1-8735e",
  storageBucket: "echomusic-1-8735e.firebasestorage.app",
  messagingSenderId: "58607629067",
  appId: "1:58607629067:web:6386b26e393eeba262a80e",
  measurementId: "G-0XR1P2QEK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);