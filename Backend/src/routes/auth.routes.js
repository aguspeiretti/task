import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMidelware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { verifyTokenRequest } from "../../../Frontend/src/api/auth.js";

const router = Router();

//aca le digo que cuando haga una peticon a "/register" ejecute register del controller

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequiered, profile);
export default router;
