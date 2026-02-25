const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, minStock } = req.body;

    if (!name || !category || !price || stock === undefined || !minStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

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
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock, minStock } = req.body;
    
    let status = "In Stock";
    if (stock === 0) status = "Out of Stock";
    else if (stock < minStock) status = "Low Stock";

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, stock, minStock, status },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};