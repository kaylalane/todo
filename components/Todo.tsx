import { auth, db } from "./config.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect, Suspense } from "react";
import Navbar from "./Navbar.js";
import { Task } from "./Task";
import { useLocation, Navigate } from "react-router-dom";
import { NewTask } from "./NewTask";
import RequireAuth from "./RequireAuth.js";

type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  id: string;
  status: string;
  user_id: string;
};


export default function ToDo() {
  const [todos, setTodos] = useState<TaskType[]>([]);
  const fetchPost = () => {
    console.log("fetch post");

    //query for todos with user uids
    const q = query(
      collection(db, "todos"),
      where("user_id", "==", auth.currentUser?.uid)
    );

    getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //@ts-ignore
      setTodos(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <RequireAuth>
      <div className="px-4 w-full">
        <NewTask todos={todos} setTodos={setTodos} />

        <div className="flex flex-col sm:flex-row gap-4">
          <section className="bg-[#191d20] p-4 rounded-xl basis-1/2">
            <div className=" flex gap-2 justify-between">
              <h2 className=" text-xl">In Progress</h2>
              <p className=" text-sm text-slate-300 self-center">
                {todos.filter((todo) => todo.status == "NOT_STARTED").length}{" "}
              </p>
            </div>
            <div>
              {todos
                .filter((todo) => todo.status == "NOT_STARTED")
                .map((todo) => (
                  <Task
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}
            </div>
          </section>

          <section className="basis-1/2 bg-[#191d20] rounded-xl p-4">
            <div className="flex justify-between">
              <h2 className="text-xl">Completed</h2>
              <p className=" text-sm text-slate-300 self-center">
                {todos.filter((todo) => todo.status == "COMPLETED").length}{" "}
              </p>
            </div>

            <div>
              {todos
                .filter((todo) => todo.status == "COMPLETED")
                .map((todo) => (
                  <Task
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </RequireAuth>
  );
}
