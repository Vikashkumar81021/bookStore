import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoute from "./routes/user-route.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/v1/", userRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`server is listen at ${PORT}`);
});
