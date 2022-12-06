// Import the functions you need from the SDKs you need
import { collection, getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDHkbXYkXh6HNkzfP9zhQKcuwm33cMtXY",
  authDomain: "disko-line.firebaseapp.com",
  projectId: "disko-line",
  storageBucket: "disko-line.appspot.com",
  messagingSenderId: "81969431741",
  appId: "1:81969431741:web:6afe400af3d3e46663e3d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//Authentication
export const auth = getAuth(app);

//Database Collection
export const usersRef = collection(db, "users");
export const areasRef = collection(db, "omraader");
export const stopsRef = collection(db, "stoppesteder");
export const routesRef = collection(db, "ruter");
export const priceTablesRef = collection(db, "pristabeller");
export const SailingTimesRef = collection(db, "sejltider");
export const timeTablesRef = collection(db, "fartplaner");
