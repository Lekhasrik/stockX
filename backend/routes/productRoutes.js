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

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;