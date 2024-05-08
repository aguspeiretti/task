import { Router } from "express";
import { authRequiered } from "../middlewares/validateToken.js";
import {
  getTask,
  getTasks,
  updateTasks,
  deleteTasks,
  createTasks,
  getUserTasks,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/alltasks", authRequiered, getTasks);
router.get("/tasks", authRequiered, getUserTasks);
router.get("/tasks/:id", authRequiered, getTask);
router.post("/tasks", authRequiered, createTasks);
router.delete("/tasks/:id", authRequiered, deleteTasks);
router.put("/tasks/:id", authRequiered, updateTasks);

export default router;
