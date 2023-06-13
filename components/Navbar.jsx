import { signOut } from "firebase/auth";
import { auth } from "./config";
import { useNavigate, redirect } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <nav className="p-4 flex justify-between items-center">
      <h1 className=" text-2xl text-center">
        What Should Frontend Developers Be Doing Today?
      </h1>
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {
              navigate("/signin", { replace: true });
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        className="bg-button p-4 rounded-xl text-black"
      >
        Signout
      </button>
    </nav>
  );
}
