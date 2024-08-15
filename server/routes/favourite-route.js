import express from "express";
import { authorization } from "../middleware/Auth.js";
import {
  favouriteBook,
  getFavouriteBooks,
  RemovefavouriteBook,
} from "../controllers/favourite-controller.js";
const router = express.Router();
router.put("/add-Book-to-favourite", authorization, favouriteBook);
router.put("/remove-book-from-favourite", authorization, RemovefavouriteBook);

router.get("/get-all-favourite-book", authorization, getFavouriteBooks);
export default router;
