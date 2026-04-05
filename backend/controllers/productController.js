const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, minStock } = req.body;

    if (!name || !category || !price || stock === undefined || !minStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if product with same name and category already exists
    const existing = await Product.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      category: { $regex: new RegExp(`^${category.trim()}$`, "i") }
    });

    if (existing) {
      // Increase stock and update price/minStock
      existing.stock += Number(stock);
      existing.price = Number(price);
      existing.minStock = Number(minStock);

      if (existing.stock === 0) existing.status = "Out of Stock";
      else if (existing.stock < existing.minStock) existing.status = "Low Stock";
      else existing.status = "In Stock";

      await existing.save();
      return res.json({ product: existing, merged: true, message: `Product already exists. Stock increased to ${existing.stock}` });
    }

    let status = "In Stock";
    if (stock === 0) status = "Out of Stock";
    else if (stock < minStock) status = "Low Stock";

    const product = new Product({
      name: name.trim(),
      category: category.trim(),
      price,
      stock,
      minStock,
      status
    });

    await product.save();
    res.json({ product, merged: false });
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

exports.addStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.stock += quantity;

    // status update
    if (product.stock === 0) {
      product.status = "Out of Stock";
    } else if (product.stock <= product.minStock) {
      product.status = "Low Stock";
    } else {
      product.status = "In Stock";
    }

    await product.save();

    res.json({ message: "Stock updated", product });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};