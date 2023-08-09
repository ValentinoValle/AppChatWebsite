import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpahU4aLKKVpUXBL2zhJ5sAH4ISQnvOeg",
  authDomain: "appchat-22924.firebaseapp.com",
  projectId: "appchat-22924",
  storageBucket: "appchat-22924.appspot.com",
  messagingSenderId: "724962510303",
  appId: "1:724962510303:web:16604ce6e509b8b332706a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();