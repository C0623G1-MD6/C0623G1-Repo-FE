// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBzTRumLMYQWP2qebq3B5d61Ul9HVvzdk0",
    authDomain: "c0623g1-project.firebaseapp.com",
    projectId: "c0623g1-project",
    storageBucket: "c0623g1-project.appspot.com",
    messagingSenderId: "738632898632",
    appId: "1:738632898632:web:6e857ebee00f93990b607d",
    measurementId: "G-RT5WLZE9XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;