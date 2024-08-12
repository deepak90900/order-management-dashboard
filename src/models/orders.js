// src/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  filePath: { type: String, required: false },
  stage: {
    type: String,
    enum: ["Design", "Print", "Delivery", "Finished"],
    default: "Design",
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
