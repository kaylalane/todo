import { useEffect, useState } from "react";
import "./styles/App.scss";
import Calender from "../components/Calendar";
import ToDo from "../components/Todo";
import { initializeApp } from "firebase/app";
import { config } from "../components/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
const firebaseApp = initializeApp(config.firebase);
const auth = getAuth();

function App() {
  return <ToDo />;
}

export default App;
