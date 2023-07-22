import { auth, db } from "./config.js";
import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
