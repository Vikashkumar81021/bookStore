import UserModel from "../models/user-model.js";

export const addToCart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await UserModel.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(400).json({
        message: "Book is already in cart",
      });
    }
    await UserModel.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });
    return res.status(200).json({
      messsage: "Book successfully add to cart",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};

export const removeToCart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await UserModel.findById(id);

    await UserModel.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    return res.status(200).json({
      messsage: "Book remove from  cart",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await UserModel.findById(id).populate("cart");
    const Cart = userData.cart.reverse();
    return res.status(200).json({
      message: "SUCCESS",
      data: Cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};
