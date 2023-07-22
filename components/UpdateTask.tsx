import { Dialog } from "@headlessui/react";
import { useState } from "react";

type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  id: string;
  status: string;
  user_id: string;
  username?: string;
};

export const UpdateTask = ({ todo }: { todo: TaskType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempTask, setTempTask] = useState(todo);
  return (
    <>
      <div className="flex items-center gap-2 my-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#7A306C] p-1 rounded-2xl font-semibold flex items-center align-middle"
        >
          Edit
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="">
          <Dialog.Panel className="w-full">
            <Dialog.Title className=" text-center text-xl">
              Edit Todo
            </Dialog.Title>

            <form>
              <label>
                Title
                <input
                  value={tempTask.title}
                  onChange={(e) =>
                    setTempTask({ ...tempTask, title: e.target.value })
                  }
                />
              </label>

              <label>
                Description
                <input
                  value={tempTask.description}
                  onChange={(e) =>
                    setTempTask({ ...tempTask, description: e.target.value })
                  }
                />
              </label>

              <label>
                Due Date
                <input
                  type="date"
                  value={tempTask.due_date}
                  onChange={(e) =>
                    setTempTask({ ...tempTask, due_date: e.target.value })
                  }
                />
              </label>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
