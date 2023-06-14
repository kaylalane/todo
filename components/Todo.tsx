import { initializeApp } from "firebase/app";
import { app, auth, db } from "./config.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  Timestamp,
  onSnapshot,
  query,
  where,
  runTransaction,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import { Task } from "./Task";
import { useNavigate } from "react-router-dom";
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

export default function ToDo() {
  let navigate = useNavigate();
  const [todos, setTodos] = useState<TaskType[]>([]);
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (result) => {
      if (result == null) {
        navigate("/signin");
      } else {
        setUid(result.uid);
        console.log(auth.currentUser?.uid);
        //todoCollection = collection(db, `users/${uid}/todos`);
      }
    });

    onSnapshot(todoCollection, (snapshot) => {
      // Create an object indexed by changes
      const changes = snapshot.docChanges(
        getDocs(todoCollection).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));//@ts-ignore
          setTodos(newData);
        }),//@ts-ignore
        (acc, curr) => {
          acc[curr.type] = curr;
        }/* ,
        { added: [], modified: [], removed: [] } */
      );
      //console.log(changes);
    });

    const fetchPost = async () => {
      //const c = collection(db, `users/${uid || auth.tenantId}/todos`);
      console.log(todoCollection);
      //let q = query(todoCollection, where("user_id", "==", uid));
      await getDocs(todoCollection).then((querySnapshot) => {
        //@ts-ignore
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })); // @ts-ignore: Unreachable code error
        console.log(newData); //@ts-ignore
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
