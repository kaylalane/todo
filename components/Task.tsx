import { Dispatch, SetStateAction, useReducer, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { List, MoreVertical } from "react-feather";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import { Dialog } from "@headlessui/react";
import { UpdateTask } from "./UpdateTask";

type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  id: string;
  status: string;
  user_id: string;
  username?: string;
};

export const Task = ({
  todo,
  todos,
  setTodos,
}: {
  todo: TaskType;
  todos: Array<TaskType>;
  setTodos: Dispatch<SetStateAction<TaskType[]>>;
}) => {
  const currentDoc = doc(db, `todos/${todo.id}`);
  const [isOpen, setIsOpen] = useState(false);
  const [tempTask, setTempTask] = useState(todo);

  const markComplete = () => {
    updateDoc(currentDoc, { status: "COMPLETED" });

    setTodos(
      todos.map((listItem) => {
        if (listItem.id === todo.id) {
          // Create a *new* object with changes
          return { ...listItem, status: "COMPLETED" };
        } else {
          // No changes
          return listItem;
        }
      })
    );
  };

  const markIncomplete = () => {
    updateDoc(currentDoc, { status: "NOT_STARTED" });
    setTodos(
      todos.map((listItem) => {
        if (listItem.id === todo.id) {
          // Create a *new* object with changes
          return { ...listItem, status: "NOT_STARTED" };
        } else {
          // No changes
          return listItem;
        }
      })
    );
  };

  const updateTask = () => {
    updateDoc(currentDoc, {
      title: tempTask.title,
    });
  };

  const deleteTask = () => {
    deleteDoc(currentDoc);
    setTodos(todos.filter((a) => a.id !== todo.id));
  };
  return (
    <div className=" bg-[#111315] text-white rounded-xl p-4 m-2">
      <div className="flex justify-between">
        {todo.title}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#111315]">
            {todo.status == "NOT_STARTED" ? (
              <DropdownMenuItem onClick={() => markComplete()}>
                Complete
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => markIncomplete()}>
                Mark incomplete
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteTask()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className=" text-gray-400">{todo.description}</p>
      {todo.due_date && <p className="text-gray-700">Due {todo.due_date}</p>}

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="dialog-box">
          <Dialog.Panel className="w-full">
            <Dialog.Title className=" text-center text-xl">
              Create a new todo!
            </Dialog.Title>

            <form className=" flex flex-col gap-4">
              <label className=" flex flex-col gap-1">
                Title
                <input
                  className=" p-2 rounded-lg"
                  value={tempTask.title}
                  onChange={(e) =>
                    setTempTask({ ...tempTask, title: e.target.value })
                  }
                />
              </label>

              <label className=" flex flex-col gap-1">
                Description
                <input
                  className=" p-2 rounded-lg"
                  value={tempTask.description}
                  onChange={(e) =>
                    setTempTask({ ...tempTask, description: e.target.value })
                  }
                />
              </label>

              <label className=" flex flex-col gap-1">
                Due Date
                <input
                  className=" p-2 rounded-lg"
                  type="date"
                  value={tempTask.due_date}
                  onChange={(e) =>
                    setTempTask({ ...tempTask, due_date: e.target.value })
                  }
                />
              </label>

              <button>Update Task</button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
