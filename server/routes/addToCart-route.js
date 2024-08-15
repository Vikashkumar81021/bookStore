import express from "express";
import { authorization } from "../middleware/Auth.js";
import {
  addToCart,
  getUserCart,
  removeToCart,
} from "../controllers/addToCart-controller.js";

const router = express.Router();
router.put("/add-to-cart", authorization, addToCart);
router.put("/remove-from-cart", authorization, removeToCart);
router.get("/get-user-cart", authorization, getUserCart);
export default router;
