import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const TaskPage = () => {
  const { getTasks, task } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (task.length === 0) return <h1> No task</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {task.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};

export default TaskPage;
