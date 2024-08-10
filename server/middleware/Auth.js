// import jwt from "jsonwebtoken";
// export const authorization = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) return res.status(401).json({ error: "Token Not Found" });

//   const token = req.headers.authorization.split("")[1];
//   if (!token) return res.status(401).json({ error: "unauthorized" });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  // Split the authorization header by space to get the token
  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};
