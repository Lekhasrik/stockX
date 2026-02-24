// const router = require("express").Router();
// const { addSale } = require("../controllers/salesController");

// // Add Sale (Stock reduce logic irukum 🔥)
// router.post("/", addSale);

// module.exports = router;



// const router = require("express").Router();
// const { addSale } = require("../controllers/salesController");

// router.post("/", addSale);   // ⚠️ must be "/"
// router.post("/bulk", addBulkSale);
// module.exports = router;

// console.log("Sales route loaded 🔥");



const router = require("express").Router();
const { addSale, addBulkSale } = require("../controllers/salesController");

// Single product sale
router.post("/", addSale);

// Multiple products sale (cart checkout)
router.post("/bulk", addBulkSale);

console.log("Sales route loaded 🔥");

module.exports = router;