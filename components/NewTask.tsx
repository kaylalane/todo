import { Dialog } from "@headlessui/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { auth, db } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import { Plus } from "react-feather";

const todoCollection = collection(db, "todos");
const initialTask = { title: "", description: "", dueDate: "", username: "" };

export const NewTask = () => {
  const [uid, setUid] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [newTaskForm, setNewTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    username: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmitNewTask = (e: FormEvent) => {
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
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid !== "") {
          setUid(user.uid);
        }
        console.log("there is a user", uid);
      } else {
        console.log("there is not a user");
      }
    });
  }, []);
  return (
    <>
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
                  onChange={(e) => changeHandler(e)}
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
    </>
  );
};
