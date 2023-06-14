import * as React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../components/Register";
import Signin from "../components/Signin";
import ToDo from "../components/Todo";
import { render } from "react-dom";

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
