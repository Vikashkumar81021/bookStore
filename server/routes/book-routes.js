import express from "express";
import { authorization } from "../middleware/Auth.js";
import {
  addBook,
  bookDelete,
  bookUpdate,
} from "../controllers/book-controller.js";

const router = express.Router();

router.post("/add-book", authorization, addBook);
router.put("/bookUpdate", authorization, bookUpdate);
router.delete("/bookDelete ", authorization, bookDelete);
export default router;
