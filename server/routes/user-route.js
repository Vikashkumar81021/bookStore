import express from "express";
import {
  register,
  login,
  getUser,
  updateUser,
} from "../controllers/user-controller.js";
import { authorization } from "../middleware/Auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/getUser", authorization, getUser);
router.put("/userupdate", authorization, updateUser);
export default router;
