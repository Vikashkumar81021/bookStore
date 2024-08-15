import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoute from "./routes/user-route.js";
import bookroute from "./routes/book-routes.js";
import favouriteBook from "./routes/favourite-route.js";
import addToCart from "./routes/addToCart-route.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1", bookroute);
app.use("/api/v1", favouriteBook);
app.use("/api/v1", addToCart);
connectDB();
app.listen(PORT, () => {
  console.log(`server is listen at ${PORT}`);
});
