import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Register from "../components/Register";
import Signin from "../components/Signin";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ToDo from "../components/Todo";
import { initializeApp } from "@firebase/app";
import { auth, app } from "../components/config";

//const user = auth.currentUser;
const router = createBrowserRouter([
  {
    path: "/",
    element: <ToDo />,
    loader: async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("there is a user");
        } else {
          console.log("there is not a user");
        }
      });
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
