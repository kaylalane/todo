import { initializeApp } from "firebase/app";
import { auth, app, db } from "./config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usersCollection = collection(db, "users");


export default function Register() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [signinForm, setSigninForm] = useState(true);
  const navigate = useNavigate();

  function handleSubmit(e) {
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
        // ..
      });
  }

  function handleNewUser() {
    console.log("made it here");
    addDoc(todoCollection, {
      user_id: newTaskForm.userId,
      title: newTaskForm.title,
      description: newTaskForm.description,
      due_date: newTaskForm.dueDate,
    });
    fetchPost();
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
              setFormState((s) => ({ ...s, name: e.target.value }))
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
            autoComplete="new-password"
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
          Register
        </button>
        <a href="/signin" className="underline">
          Have an account?
        </a>
      </form>
    </div>
  );
}
