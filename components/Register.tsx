import { auth, db } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";

const usersCollection = collection(db, "users");

export default function Register() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const [error, setErrorMessage] = useState("There was a error signing in");
  const [displayError, setDisplayError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        addDoc(usersCollection, {
          user_id: uid,
          name: formState.name,
          email: formState.email,
          todos: [],
        });

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMessage(errorMessage);
        setDisplayError(true);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-6 justify-center items-center w-full max-w-xl"
      >
        <h2 className="text-2xl">Register</h2>
        <label className="w-full">
          Name
          <input
            required
            autoComplete="given-name"
            value={formState.name}
            className="p-2 mt-1 text-black w-full rounded-xl"
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
          />
        </label>

        <label className=" w-full">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={formState.email}
            className="p-2 mt-1 text-black w-full rounded-xl"
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
        </label>

        <label className="w-full">
          Password
          <div>
            <input
              required
              value={formState.password}
              type="password"
              autoComplete="new-password"
              className="p-2 mt-1 text-black w-full rounded-xl"
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
            <button
              className="absolute top-1/4 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye color="black" /> : <EyeOff color="black" />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          className="bg-button p-2 mt-2 rounded-xl text-black w-full"
        >
          Register
        </button>
        <a href="/signin" className="underline">
          Have an account?
        </a>
        {displayError && <p className=" text-red-700">{error}</p>}
      </form>
    </div>
  );
}
