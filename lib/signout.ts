import { getAuth, signOut } from "firebase/auth";
import { redirect } from "react-router-dom";

const auth = getAuth();
export const signout = () => {
  signOut(auth)
    .then(() => {
      redirect("/signin");
    })
    .catch((error) => {
      console.log(error);
    });
};
