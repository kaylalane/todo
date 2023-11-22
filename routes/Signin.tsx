import { auth } from "../components/config";
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
    <main className="purple-gradient flex flex-col justify-center items-center min-h-screen">
      <div className="form-container">
        <div className=" form-header">
          <h2 className=" text-2xl">Sign In</h2>
          <p>Use your email and password to sign in.</p>
        </div>
        <form className="l" onSubmit={(e) => e.preventDefault()}>
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
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye color="black" size={20} />
                ) : (
                  <EyeOff color="black" size={20} />
                )}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="btn"
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
          </button>
          <a href="/register" className=" underline">
            Need an account?
          </a>
        </form>
        <p className=" form-error"> {displayError && error}</p>
      </div>
    </main>
  );
}
