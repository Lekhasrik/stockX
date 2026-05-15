// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: String,
//   items: Array,
//   total: Number,
//   orderNumber: String,
//   status: {
//     type: String,
//     default: "Pending"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);

//new
const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: String,
//   productId: String,
//   productName: String,
//   price: Number,
//   paymentMethod: String, // COD / ONLINE
//   status: {
//     type: String,
//     default: "Placed"
//   }
// }, { timestamps: true });

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      name: String,
      price: Number
    }
  ],
  total: Number,
  paymentMethod: String,
  status: {
    type: String,
    default: "Placed"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);