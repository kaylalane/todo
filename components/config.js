// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJP_Pb1wZ_pBCf9tIaGPq2gxRL_QdnuSE",
  authDomain: "todo-list-9b6c5.firebaseapp.com",
  databaseURL: "https://todo-list-9b6c5-default-rtdb.firebaseio.com",
  projectId: "todo-list-9b6c5",
  storageBucket: "todo-list-9b6c5.appspot.com",
  messagingSenderId: "486542627227",
  appId: "1:486542627227:web:dd3e1a8b50c56417fd113e",
  measurementId: "G-02WVH2390G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
let user;
let key = null;
export function setUser() {
  user = auth.currentUser;
}


export function getUser() {
  return user;
}
