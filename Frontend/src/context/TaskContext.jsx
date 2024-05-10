/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  createTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  getTasksRequest,
  updateTasksRequest,
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within Authprovider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [task, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest();
    try {
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTasksRequest(task);
    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) setTasks(task.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getOneTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      console.log("aquiiiii", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    console.log("update", id, task);
    try {
      const res = await updateTasksRequest(id, task);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        task,
        createTask,
        getTasks,
        deleteTask,
        getOneTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
