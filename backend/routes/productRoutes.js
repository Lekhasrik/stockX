const router = require("express").Router();
const {
  addProduct,
  getProducts,
  deleteProduct
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

module.exports = router;