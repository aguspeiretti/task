import { authRequiered } from "../middlewares/validateToken.js";
import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    return res.status(404).json({ message: "task not found" });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(404).json({ message: "task not found" });
  }
};

export const createTasks = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(404).json({ message: "task not found" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "task not found" });

    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "task not found" });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "task not found" });

    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "task not found" });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "task not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "task not found" });
  }
};
