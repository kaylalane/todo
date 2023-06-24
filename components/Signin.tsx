import { auth } from "./config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";

export default function Signin() {
  let navigate = useNavigate();
  const [error, setErrorMessage] = useState("There was a error signing in");
  const [displayError, setDisplayError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setDisplayError(true);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col gap-6 justify-center items-center w-full max-w-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <h2 className=" text-2xl">Signin</h2>
        </div>
        <label className="w-full">
          Email
          <input
            required
            type="email"
            autoComplete="username"
            value={formState.email}
            className="p-2 mt-1 text-black w-full rounded-xl"
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
        </label>

        <label className="w-full">
          Password
          <div className="relative">
            <input
              required
              id="password"
              value={formState.password}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="p-2 mt-1 text-black w-full rounded-xl relative"
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
          onClick={(e) => handleSubmit(e)}
        >
          Sign in
        </button>
        <a href="/register" className=" underline">
          Need an account?
        </a>
        {displayError && <p className=" text-red-700">{error}</p>}
      </form>
    </div>
  );
}
