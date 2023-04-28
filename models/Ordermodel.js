const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A order must have a name"],
  },
  email: {
    type: String,
    required: [true, "A order must have a email"],
  },
  Number: {
    type: Number,
    required: [true, "A order must have a Number"],
  },
  address: {
    type: String,
    required: [true, "A order must have a address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  payment: {
    type: String,
    default: "unpaid",
  },
  totalAmount: {
    type: Number,
  },
  details: {
    type: String,
  },
  foodname: {
    type: String,
  },
});
const order = mongoose.model("order", orderSchema);

module.exports = order;
