import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1uJBPG5dCvWgtYrs4ZVSvPKjiBxiS1wY",
    authDomain: "grda-website.firebaseapp.com",
    projectId: "grda-website",
    storageBucket: "grda-website.firebasestorage.app",
    messagingSenderId: "946688267461",
    appId: "1:946688267461:web:29f6e375f8fafcbff78cac",
    measurementId: "G-33H5G1LET1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app, "gs://grda-website.firebasestorage.app");
const analytics = getAnalytics(app);

export default app;
