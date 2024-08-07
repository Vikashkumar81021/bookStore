import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out of delivery", "Delivery Canceled"],
    },
  },
  { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);
export default order;
