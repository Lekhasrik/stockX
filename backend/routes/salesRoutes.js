const router = require("express").Router();
const { addSale, addBulkSale, getSalesHistory, getSalesAnalytics } = require("../controllers/salesController");

// Single product sale
router.post("/", addSale);

// Multiple products sale (cart checkout)
router.post("/bulk", addBulkSale);

// Get sales history
router.get("/history", getSalesHistory);

// Get sales analytics
router.get("/analytics", getSalesAnalytics);

module.exports = router;
