/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
            className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
          >
            delete
          </button>
          <Link
            className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-md"
            to={`/task/${task._id}`}
          >
            {" "}
            edit{" "}
          </Link>
        </div>
      </header>
      <p className="text-sl-300">{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
};

export default TaskCard;
