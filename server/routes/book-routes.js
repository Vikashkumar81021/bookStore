import express from "express";
import { authorization } from "../middleware/Auth.js";
import {
  addBook,
  bookDelete,
  bookUpdate,
  getAllBook,
  getBookByID,
  getRecentBook,
} from "../controllers/book-controller.js";

const router = express.Router();

router.post("/add-book", authorization, addBook);
router.put("/bookUpdate", authorization, bookUpdate);
router.delete("/bookDelete ", authorization, bookDelete);
router.get("/getallBook", getAllBook);
router.get("/get-recent-book", getRecentBook);
router.get("/getBookById/id", getBookByID);

export default router;
