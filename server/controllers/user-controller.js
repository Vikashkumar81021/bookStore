import UserModel from "../models/user-model.js";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password, address } = req.body;

    if (
      [userName, email, password, address].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "All fields are required and must not be empty.",
        success: false,
      });
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new UserModel({ userName, password, email, address });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", success: true, newUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const Logout = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
