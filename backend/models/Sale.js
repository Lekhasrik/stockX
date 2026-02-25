const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  invoiceNumber: String,   // 🔥 add this
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  productName: String,
  quantity: Number,
  totalPrice: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sale", saleSchema);