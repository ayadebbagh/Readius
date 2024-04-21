import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FirebaseConfig = {
  apiKey: "AIzaSyCuL-1YZzTrFjnZhWan0NKEMxCIfqfWhCk",
  authDomain: "readius.firebaseapp.com",
  projectId: "readius",
  storageBucket: "readius.appspot.com",
  messagingSenderId: "87196297489",
  appId: "1:87196297489:web:599b8b077b39c3a20104b0",
  measurementId: "G-WRBEYY1BF9",
};

const FbApp = initializeApp(FirebaseConfig);

// Export the initialized Firebase app
export default FbApp;
