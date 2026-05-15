const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   address: String,
//   password: String
// }, { timestamps: true });

// models/User.js

// const userSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   address: String,
//   password: String,
//   role: {
//     type: String,
//     default: "user" // default user
//   }
// });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);