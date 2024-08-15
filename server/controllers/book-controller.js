import Book from "../models/book-model.js";
import UserModel from "../models/user-model.js";
export const addBook = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "You do not have access to perform admin work",
      });
    }

    const book = new Book(req.body);
    await book.save();

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error adding book:", error.message);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

export const bookUpdate = async (req, res) => {
  try {
    const { bookid } = req.headers;
    const { url, title, price, author, description, language } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      bookid,
      { url, title, price, author, description, language },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(201).json({
      message: "update successfully",
      sucess: true,
      updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Inrenal server error",
    });
  }
};

export const bookDelete = async (req, res) => {
  try {
    const { bookid } = req.body;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
      message: "User deleted successfully",
      sucess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      success: false,
    });
  }
};

export const getAllBook = async (req, res) => {
  try {
    const book = await Book.find().sort({ createdAt: -1 });
    return res.status(201).json({
      message: "SUCCESS",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getRecentBook = async (req, res) => {
  try {
    const book = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(201).json({
      message: "SUCCESS",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
      message: "update book get successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
    });
  }
};
