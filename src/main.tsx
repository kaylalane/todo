import * as React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../routes/Register";
import Signin from "../routes/Signin";
import ToDo from "../components/Todo";
import App from "../routes/App";
import Calender from "../routes/Calender";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/calender",
    element: <Calender />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className=" min-h-screen">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
