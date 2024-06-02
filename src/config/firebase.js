// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMReUPanJVDBbQ6U1-5GdyoazFH3Xee6o",
  authDomain: "jewelry-production.firebaseapp.com",
  projectId: "jewelry-production",
  storageBucket: "jewelry-production.appspot.com",
  messagingSenderId: "1075441933073",
  appId: "1:1075441933073:web:ec2d529a0e15d749eecab0",
  measurementId: "G-E1YN8Z8DQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
export { storage, provider, auth };
