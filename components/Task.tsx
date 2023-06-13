import { useReducer } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "react-feather";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  id: string;
  status: string;
  user_id: string;
};

export const Task = ({ todo }: { todo: TaskType }) => {
  const currentDoc = doc(db, `todos/${todo.id}`);

  const markComplete = () => {
    updateDoc(currentDoc, { status: "COMPLETED" });
  };

  const markIncomplete = () => {
    updateDoc(currentDoc, { status: "NOT_STARTED" });
  };

  const deleteTask = () => {
    deleteDoc(currentDoc);
  };
  return (
    <div className=" bg-[#111315] text-white rounded-xl p-4 m-2">
      <div className="flex justify-between">
        {todo.title}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {todo.status == "NOT_STARTED" ? (
              <DropdownMenuItem onClick={() => markComplete()}>
                Complete
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => markIncomplete()}>
                Mark incomplete
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteTask()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className=" text-gray-400">{todo.description}</p>
      <p className="text-gray-700">{todo.due_date}</p>
    </div>
  );
};
