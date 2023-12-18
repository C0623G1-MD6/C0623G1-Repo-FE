import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref as refImage, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBL1509NCKA50w9GRCu4-WW5oi7g88NS0M",
    authDomain: "fashion-369f7.firebaseapp.com",
    projectId: "fashion-369f7",
    storageBucket: "fashion-369f7.appspot.com",
    messagingSenderId: "1051084688820",
    appId: "1:1051084688820:web:c4c8361ef6e8c38c8fb6e1",
    measurementId: "G-17G6X4S764"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage, refImage, uploadBytes, getDownloadURL };