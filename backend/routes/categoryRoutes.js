const router = require("express").Router();
const {
  addCategory,
  getCategories,
  deleteCategory
} = require("../controllers/categoryController");

router.post("/", addCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);

module.exports = router;