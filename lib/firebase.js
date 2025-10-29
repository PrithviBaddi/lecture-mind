// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwt9Pc3QWR0YzqkMKuGa-Q_iOp8Eu4484",
  authDomain: "lecture-mind.firebaseapp.com",
  databaseURL: "https://lecture-mind-default-rtdb.firebaseio.com",
  projectId: "lecture-mind",
  storageBucket: "lecture-mind.firebasestorage.app",
  messagingSenderId: "414053425533",
  appId: "1:414053425533:web:8f52dd8046a6f4c0daac14",
  measurementId: "G-SQTS44ZM6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);