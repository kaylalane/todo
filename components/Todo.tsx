import { initializeApp } from "firebase/app";
import { app, auth, db } from "./config.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, Timestamp, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import { Task } from "./Task";
import { useNavigate } from "react-router-dom";
import { NewTask } from "./NewTask";

const todoCollection = collection(db, "todos");
type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  id: string;
  status: string;
  user_id: string;
};
export default function ToDo() {
  let navigate = useNavigate();
  const [todos, setTodos] = useState<TaskType[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (result) => {
      if (result == null) {
        navigate("/signin");
      }
    });

    onSnapshot(todoCollection, (snapshot) => {
      // @ts-ignore: Unreachable code error
      const changes = snapshot.docChanges.reduce( (acc, curr) => {
          acc[curr.type] = curr;
        },
              // @ts-ignore: Unreachable code error
         getDocs(todoCollection).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));// @ts-ignore: Unreachable code error
          setTodos(newData);
        } // @ts-ignore: Unreachable code error
        ,
        { added: [], modified: [], removed: [] }
      ));
      //console.log(changes);
    });

    const fetchPost = async () => {
      await getDocs(todoCollection).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));// @ts-ignore: Unreachable code error
        setTodos(newData);
      });
    };

    fetchPost();
  }, []);

  return (
    <div className="px-4 ">
      <Navbar />
      <NewTask />

      <div className="flex gap-4">
        <section className="bg-[#191d20] p-4 rounded-xl basis-1/2">
          <h2 className=" text-xl">To Do</h2>

          {todos.length == 0 ? (
            <p className="flex gap-2 bg-[#111315] text-white rounded-xl p-4 m-2">
              Make some todos!
            </p>
          ) : (
            <div>
              {todos
                .filter((todo) => todo.status == "NOT_STARTED")
                .map((todo) => (
                  <Task todo={todo} key={todo.id} />
                ))}
            </div>
          )}
        </section>

        <section className="basis-1/2 bg-[#191d20] rounded-xl p-4">
          <div className="flex justify-between">
            <h2 className="text-xl">Completed</h2>
          </div>

          {todos.length == 0 ? (
            <p className="flex gap-2 bg-[#111315] text-white rounded-xl p-4 m-2">
              Make some todos!
            </p>
          ) : (
            <div>
              {todos
                .filter((todo) => todo.status == "COMPLETED")
                .map((todo) => (
                  <Task todo={todo} key={todo.id} />
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
