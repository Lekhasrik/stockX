const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const { name, category, price, stock, minStock } = req.body;

  let status = "In Stock";
  if (stock === 0) status = "Out of Stock";
  else if (stock < minStock) status = "Low Stock";

  const product = new Product({
    name,
    category,
    price,
    stock,
    minStock,
    status
  });

  await product.save();
  res.json(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};