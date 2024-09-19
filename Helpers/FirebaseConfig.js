import { initializeApp } from "firebase/app";

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

export default FbApp;
