// const router = require("express").Router();
// const {
//   addProduct,
//   getProducts,
//   updateProduct,
//   deleteProduct,
//   addStock 
// } = require("../controllers/productController");

// router.post("/", addProduct);
// router.get("/", getProducts);

// router.delete("/:id", deleteProduct);
// router.put("/add-stock/:id", addStock);
// router.put("/:id", updateProduct);

// module.exports = router;

const router = require("express").Router();
const Product = require("../models/Product");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addStock
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/", getProducts);

// ✅ IMPORTANT ORDER
// router.put("/add-stock/:id", addStock);
router.put("/add-stock/:id", (req, res, next) => {
  console.log("ADD STOCK HIT 🔥");
  next();
}, addStock);

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;