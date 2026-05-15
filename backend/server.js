// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// // const orderRoutes = require("./routes/orderRoutes");

// try {
//   const orderRoutes = require("./routes/orderRoutes");
//   console.log("✅ orderRoutes imported");

//   app.use("/api/orders", orderRoutes);
// } catch (err) {
//   console.log("❌ ERROR loading orderRoutes:", err);
// }


// const app = express();

// console.log("🔥 server running");

// // app.use(cors());
// app.use(cors({
//   origin: "*"
// }));
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/sales", require("./routes/salesRoutes"));

// app.use("/api/auth", authRoutes);
// // app.use("/api/orders", orderRoutes);
// // app.listen(5000, () => console.log("Server running on port 5000"));
// app.listen(process.env.PORT || 5000);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

console.log("🔥 server running");

app.use(cors({
  origin: "*"
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);