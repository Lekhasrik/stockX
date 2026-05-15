
//new
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


console.log("✅ orderRoutes loaded");

router.post("/", async (req, res) => {
  try {
    const { userId, items, paymentMethod } = req.body;

    // 🔥 CALCULATE TOTAL HERE
    const total = items?.reduce((sum, item) => {
      return sum + Number(item.price || 0);
    }, 0);

    // 🔥 CREATE ORDER WITH TOTAL
    const order = new Order({
      userId,
      items,
      total, // 👈 IMPORTANT FIX
      paymentMethod,
      status: "Placed"
    });

    await order.save();
    res.json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 GET ALL ORDERS (ADMIN)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET USER ORDERS
// router.get("/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


//new
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//admin usage
//new



// 🔥 UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;



//new
