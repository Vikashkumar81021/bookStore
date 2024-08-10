// export const sendToken = (user, res) => {
//   const token = user.generateAccessToken();

//   // Options for cookie
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   res.status(201).cookie("token", token, options).json({
//     success: true,

//     user,
//     token,
//   });
// };
