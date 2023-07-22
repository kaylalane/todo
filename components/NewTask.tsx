import { Dialog } from "@headlessui/react";
import { Timestamp, addDoc, collection, doc } from "firebase/firestore";
import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { auth, db } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import { Plus } from "react-feather";
import { StringToBoolean } from "class-variance-authority/dist/types";
import { TZDate } from "@toast-ui/calendar";

type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  start?: TZDate;
  end?: TZDate;
  isAllDay?: string;
  category?: string;
  id: string;
  status: string;
  user_id: string;
};

let todoCollection = collection(db, "todos");
//console.log(todoCollection);
const initialTask = { title: "", description: "", dueDate: "", username: "" };

export const NewTask = ({
  todos,
  setTodos,
}: {
  todos: TaskType[];
  setTodos: Dispatch<React.SetStateAction<TaskType[]>>;
}) => {
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
      setNewTaskForm({ ...newTaskForm, [e.target.name]: date });
    } else {
      setNewTaskForm({ ...newTaskForm, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitNewTask = async (e: FormEvent) => {
    e.preventDefault();
    const newDoc = await addDoc(todoCollection, {
      user_id: uid,
      title: newTaskForm.title,
      description: newTaskForm.description,
      due_date: newTaskForm.dueDate,
      start: newTaskForm.dueDate,
      end: newTaskForm.dueDate,
      status: "NOT_STARTED",
      isAllDay: "allday",
      category: "task",
      username: auth.currentUser?.displayName,
    });
    setIsOpen(false);
    setTodos([
      ...todos,
      {
        id: newDoc.id,
        user_id: uid,
        title: newTaskForm.title,
        description: newTaskForm.description,
        due_date: newTaskForm.dueDate,
        status: "NOT_STARTED",
        start: new TZDate(newTaskForm.dueDate),
        end: new TZDate(newTaskForm.dueDate),
        isAllDay: "allday",
        category: "task",
      },
    ]);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid !== "") {
          //todoCollection = collection(db, `users/${user.uid}/todos`);
          setUid(user.uid);
        }
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
          <span className=" sr-only">Add a new task</span>
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
