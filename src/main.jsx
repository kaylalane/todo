import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Register from "../components/Register";
import Signin from "../components/Signin";
import { onAuthStateChanged } from "firebase/auth";
import ToDo from "../components/Todo";
import { auth } from "../components/config";


//const user = auth.currentUser;
const router = createBrowserRouter([
  {
    path: "/",
    element: <ToDo />,
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
