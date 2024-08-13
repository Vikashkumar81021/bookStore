import UserModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { userName, email, password, address, role } = req.body;

    if (
      [userName, email, password, address, role].some(
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

    const newUser = new UserModel({ userName, password, email, address, role });

    await newUser.save();
    // Create and sign a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
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

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "Login success",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.headers;
    const data = await UserModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "user gets successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await UserModel.findByIdAndUpdate(id, { address });
    return res.status(200).json({
      success: true,
      message: "Address updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
