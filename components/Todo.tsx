import { auth, db } from "./config.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import { Task } from "./Task";
import { redirect, useNavigate } from "react-router-dom";
import { NewTask } from "./NewTask";

let todoCollection = collection(db, "todos");

type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  id: string;
  status: string;
  user_id: string;
};

//redirect unsigned in users
onAuthStateChanged(auth, (result) => {
  if (result == null) {
    redirect("/signin");
  }
});

export default function ToDo() {
  const [todos, setTodos] = useState<TaskType[]>([]);
  const fetchPost = async () => {
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

  onSnapshot(todoCollection, (snapshot) => {
    fetchPost();
  });

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="px-4 ">
      <Navbar />
      <NewTask />

      <div className="flex flex-col sm:flex-row gap-4">
        <section className="bg-[#191d20] p-4 rounded-xl basis-1/2">
          <h2 className=" text-xl">To Do</h2>

          <div>
            {todos
              .filter((todo) => todo.status == "NOT_STARTED")
              .map((todo) => (
                <Task todo={todo} key={todo.id} />
              ))}
          </div>
        </section>

        <section className="basis-1/2 bg-[#191d20] rounded-xl p-4">
          <div className="flex justify-between">
            <h2 className="text-xl">Completed</h2>
          </div>

          <div>
            {todos
              .filter((todo) => todo.status == "COMPLETED")
              .map((todo) => (
                <Task todo={todo} key={todo.id} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
