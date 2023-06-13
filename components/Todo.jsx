import { initializeApp } from "firebase/app";
import { app, auth, db } from "./config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect, useReducer } from "react";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar.jsx";
import { Plus } from "react-feather";
import { Task } from "./Task.tsx";

const todoCollection = collection(db, "todos");
const initialTask = { title: "", description: "", dueDate: null, username: "" };

//addDoc(todoCollection, { name: "David!" });

export default function ToDo() {
  const [uid, setUid] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTaskForm, setNewTaskForm] = useState({
    title: "",
    description: "",
    dueDate: null,
    username: "",
  });

  const changeHandler = (e) => {
    if (e.target.name == "dueDate") {
      var date = Timestamp.fromDate(new Date(e.target.value))
        .toDate()
        .toLocaleDateString();
      //var local = new Intl.DateTimeFormat('en-US').format(date);
      setNewTaskForm({ ...newTaskForm, [e.target.name]: date });
    } else {
      setNewTaskForm({ ...newTaskForm, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitNewTask = (e) => {
    console.log("made it here");
    e.preventDefault();
    addDoc(todoCollection, {
      user_id: uid,
      title: newTaskForm.title,
      description: newTaskForm.description,
      due_date: newTaskForm.dueDate,
      status: "NOT_STARTED",
    });
    setIsOpen(false);
    //window.location.reload();
  };

  useEffect(() => {
  
    onAuthStateChanged(auth, result => {
      if(result != null) {
        console.log(result.uid);
        setUid(result.uid)
        console.log("there is a user", uid);

      } else {
        console.log("there is not a user");

      }
    });

    onSnapshot(todoCollection, (snapshot) => {
      // Create an object indexed by changes
      const changes = snapshot.docChanges(
        getDocs(todoCollection).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTodos(newData);
        }),
        (acc, curr) => {
          acc[curr.type] = curr;
        },
        { added: [], modified: [], removed: [] }
      );
      console.log(changes);
    });

    const fetchPost = async () => {
      if (uid == "") {
        console.log("uid is null", auth.currentUser);
      }

      await getDocs(todoCollection).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(newData);
      });
    };

    fetchPost();
  }, []);

  return (
    <div className="px-4 ">
      <Navbar />
      <div className="flex items-center gap-2 my-4">
        <button
          id="add-today"
          onClick={() => setIsOpen(true)}
          className="bg-[#7A306C] p-1 rounded-2xl font-semibold flex items-center align-middle"
        >
          <Plus size={24} color="white" />
        </button>
        <p>Add task</p>
      </div>
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

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setNewTaskForm(initialTask);
        }}
      >
        <div className="dialog-box">
          <Dialog.Panel className="w-full">
            <Dialog.Title className=" text-center text-xl">
              Create a new todo!
            </Dialog.Title>

            <form
              onSubmit={(e) => {
                handleSubmitNewTask(e);
              }}
              className="flex flex-col gap-4 bg-none justify-start items-start"
            >
              <label className="flex flex-col w-full">
                Title
                <input
                  name="title"
                  className=" p-2 rounded-xl"
                  onChange={(e) =>
                    setNewTaskForm({
                      ...newTaskForm,
                      title: e.target.value,
                    })
                  }
                />
              </label>
              <label className="flex flex-col w-full">
                Description
                <textarea
                  name="description"
                  className=" p-2 rounded-xl"
                  onChange={(e) =>
                    setNewTaskForm({
                      ...newTaskForm,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label className="flex flex-col w-full">
                Due date
                <input
                  name="dueDate"
                  className=" p-2 rounded-xl"
                  type="date"
                  onChange={changeHandler}
                />
              </label>

              <button
                type="submit"
                role="button"
                className="bg-button w-full p-2 rounded-xl"
              >
                Save
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
