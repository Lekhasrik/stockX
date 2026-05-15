const Order = require("../models/Order");

// Place Order
exports.placeOrder = async (req, res) => {
  const orderNumber = "ORD" + Date.now();

  const order = new Order({
    ...req.body,
    orderNumber
  });

  await order.save();
  res.json(order);
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};

// Admin - get all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// Update status
exports.updateStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);
};