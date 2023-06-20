import { initializeApp } from "firebase/app";
import { getFirestorem, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { config } from "./components/config";

export function initialize() {
  const firebaseApp = initializeApp(config.firebase);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  if (location.hostname == "localhost") {
    connectAuthEmulator(auth, "http://localhost:9090");
    connectFirestoreEmulator(firestore, "localhost", 8080);
  }

  return { firebaseApp, auth, firestore };
}
