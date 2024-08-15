import userModel from "../models/user-model.js";

export const favouriteBook = async (req, res) => {
  try {
    const { bookId, id } = req.headers;
    const userdata = await userModel.findById(id);
    const isfavouritesBook = await userdata.favourites.includes(bookId);
    if (isfavouritesBook) {
      return res.status(200).json({
        message: "Book is already favourites",
      });
    }
    await userModel.findByIdAndUpdate(id, { $push: { favourites: bookId } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
    });
  }
};

export const RemovefavouriteBook = async (req, res) => {
  try {
    const { bookId, id } = req.headers;
    const userdata = await userModel.findById(id);
    const isfavouritesBook = await userdata.favourites.includes(bookId);
    if (isfavouritesBook) {
      await userModel.findByIdAndUpdate(id, {
        $pull: { favourites: bookId },
      });
    }

    return res.status(200).json({ message: "Book remove from favourites" });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getFavouriteBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userdata = await userModel.findById(id).populate("favourites");
    const favouriteBook = userdata.favourites;
    return res.status(200).json({
      message: "SUCCESS",
      data: favouriteBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};
