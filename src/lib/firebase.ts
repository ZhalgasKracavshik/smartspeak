import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCH8hEovjcgMl5_u7Kb3fGVi8WwtJOyVyk",
    authDomain: "smartspeak-2025.firebaseapp.com",
    projectId: "smartspeak-2025",
    storageBucket: "smartspeak-2025.firebasestorage.app",
    messagingSenderId: "576166892298",
    appId: "1:576166892298:web:184f5ed632005f7cabe0f3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
