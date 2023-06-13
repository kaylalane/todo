import { initializeApp } from "firebase/app";
import { app, auth } from "./config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { redirect } from "react-router";

export default function Signin() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  function handleSubmit() {
    signInWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        user = auth.currentUser;
        redirect("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={() => handleSubmit()}
        className="flex flex-col gap-6 justify-center items-center w-full max-w-xl"
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
              setFormState((s) => ({ ...s, email: e.target.value }))
            }
          />
        </label>

        <label className="w-full">
          Password
          <input
            required
            value={formState.password}
            type="password"
            autoComplete="current-password"
            className="p-2 mt-1 text-black w-full rounded-xl"
            onChange={(e) =>
              setFormState((s) => ({ ...s, password: e.target.value }))
            }
          />
        </label>

        <button
          type="submit"
          className="bg-button p-2 mt-2 rounded-xl text-black w-full"
        >
          Signin
        </button>
        <a href="/register">Need an account?</a>
      </form>
    </div>
  );
}
