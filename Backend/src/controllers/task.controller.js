import { authRequiered } from "../middlewares/validateToken.js";
import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const getUserTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(tasks);
};

export const createTasks = async (req, res) => {
  const { title, description, date } = req.body;
  console.log(title, description, date);
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  await newTask.save();
  res.json(newTask);
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "task not found" });

  res.json(task);
};

export const updateTasks = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "task not found" });

  res.json(task);
};

export const deleteTasks = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "task not found" });
  return res.sendStatus(204);
};
