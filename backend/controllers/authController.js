const User = require("../models/User");

// Register
// exports.register = async (req, res) => {
//   const user = new User(req.body);
//   await user.save();
//   res.json(user);
// };
// authController.js

exports.register = async (req, res) => {
  const user = new User({
    ...req.body,
    role: "user" // force user
  });

  await user.save();
  res.json(user);
};

// Login
// exports.login = async (req, res) => {
//   const { phone, password } = req.body;

//   const user = await User.findOne({ phone, password });

//   if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   res.json(user);
// };

exports.login = async (req, res) => {
  const { email, password } = req.body; // 🔥 change here

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });
};