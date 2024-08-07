import UserModel from "../models/user-model.js";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password, address } = req.body;
    const existuser = await UserModel.find({ email });
    if (existuser) {
      return res.status(400).json({
        message: "User already Exist",
        success: false,
      });
      } 
      
      const newUser = await new UserModel({
          userName: userName,
          password: password,
          email: email,
          address:address]
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
