/*import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAgGkkzATcBlxFWXJ4SpfJ9a0_aSMrVP4",
  authDomain: "little-loom.firebaseapp.com",
  projectId: "little-loom",
 storageBucket: "little-loom.firebasestorage.app",
  messagingSenderId: "540968274615",
  appId: "1:540968274615:web:ac7e04ba14da33cba21b32",
  measurementId: "G-VRHYECD7CJ"
}
const app=initializeApp(firebaseConfig)
const db=getFirestore(app)
 
export default  db;*/


// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAgGkkzATcBlxFWXJ4SpfJ9a0_aSMrVP4",
  authDomain: "little-loom.firebaseapp.com",
  projectId: "little-loom",
  storageBucket: "little-loom.appspot.com",
  messagingSenderId: "540968274615",
  appId: "1:540968274615:web:ac7e04ba14da33cba21b32",
  measurementId: "G-VRHYECD7CJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };