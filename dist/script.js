// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1HhmMq7TV2E0hKvdiKVNkIa19vN8uM9I",
  authDomain: "todo-fbd77.firebaseapp.com",
  projectId: "todo-fbd77",
  storageBucket: "todo-fbd77.appspot.com",
  messagingSenderId: "599699647561",
  appId: "1:599699647561:web:3bc0573b04e4795de46398",
  measurementId: "G-95XT1JP4Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

