const Category = require("../models/Category");

// Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category already exists (case-insensitive)
    const existing = await Category.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") }
    });

    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name: name.trim() });
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};