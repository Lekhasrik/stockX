const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  minStock: Number,
  status: {
    type: String,
    default: "In Stock"
  }
});

module.exports = mongoose.model("Product", productSchema);