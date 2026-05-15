const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

//new
// res.json({
//   message: "Login success",
//   user: {
//     id: user._id,
//     email: user.email,
//     role: user.role
//   },
//   token
// });

module.exports = router;