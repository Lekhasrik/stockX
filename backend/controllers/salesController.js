// const Product = require("../models/Product");
// const Sale = require("../models/Sale");

// // exports.addSale = async (req, res) => {
// //   const { productId, quantity } = req.body;

// //   // const product = await Product.findById(productId);
// //   const product = await Product.findById(req.body.product);

// //   if (!product) return res.status(404).json({ message: "Product not found" });

// //   if (product.stock < quantity)
// //     return res.status(400).json({ message: "Not enough stock" });

// //   product.stock -= quantity;

// //   if (product.stock === 0) product.status = "Out of Stock";
// //   else if (product.stock < product.minStock)
// //     product.status = "Low Stock";
// //   else product.status = "In Stock";

// //   await product.save();

// //   const sale = new Sale({
// //     productName: product.name,
// //     quantity,
// //     totalPrice: product.price * quantity
// //   });

// //   await sale.save();

// //   res.json({ message: "Sale Completed" });

// //   console.log("Received product ID:", product);

// //   const foundProduct = await Product.findById(product);
// //    console.log("Found product:", foundProduct);
// // };


// exports.addSale = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     const product = await Product.findById(productId);

//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     if (product.stock < quantity)
//       return res.status(400).json({ message: "Not enough stock" });

//     product.stock -= quantity;

//     if (product.stock === 0)
//       product.status = "Out of Stock";
//     else if (product.stock < product.minStock)
//       product.status = "Low Stock";
//     else
//       product.status = "In Stock";

//     await product.save();

//     await Sale.create({
//       productName: product.name,
//       quantity,
//       totalPrice: product.price * quantity
//     });

//     res.json({ message: "Sale Completed" });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };



//new


const Product = require("../models/Product");
const Sale = require("../models/Sale");


// =============================
// 🔹 SINGLE PRODUCT SALE
// =============================
exports.addSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity)
      return res.status(400).json({ message: "Missing fields" });

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity)
      return res.status(400).json({ message: "Not enough stock" });

    // Reduce stock
    product.stock -= quantity;

    // Update status
    if (product.stock === 0)
      product.status = "Out of Stock";
    else if (product.stock < product.minStock)
      product.status = "Low Stock";
    else
      product.status = "In Stock";

    await product.save();

    // Save sale record
    await Sale.create({
      product: product._id,
      productName: product.name,
      quantity,
      totalPrice: product.price * quantity,
      date: new Date()
    });

    res.json({ message: "Sale Completed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};



// =============================
// 🔹 BULK SALE (CART CHECKOUT)
// =============================
// exports.addBulkSale = async (req, res) => {
//   try {
//     const { items } = req.body; 
//     // items = [{ productId, quantity }]

//     if (!items || items.length === 0)
//       return res.status(400).json({ message: "Cart is empty" });

//     for (let item of items) {
//       const product = await Product.findById(item.productId);

//       if (!product)
//         return res.status(404).json({ message: "Product not found" });

//       if (product.stock < item.quantity)
//         return res.status(400).json({
//           message: `Not enough stock for ${product.name}`
//         });

//       // Reduce stock
//       product.stock -= item.quantity;

//       // Update status
//       if (product.stock === 0)
//         product.status = "Out of Stock";
//       else if (product.stock < product.minStock)
//         product.status = "Low Stock";
//       else
//         product.status = "In Stock";

//       await product.save();

//       // Save sale record
//       await Sale.create({
//         product: product._id,
//         productName: product.name,
//         quantity: item.quantity,
//         totalPrice: product.price * item.quantity,
//         date: new Date()
//       });
//     }

//     res.json({ message: "Bulk Sale Completed" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

exports.addBulkSale = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // 🔥 Generate Unique Invoice Number
    const invoiceNumber = "INV" + Date.now();

    let totalAmount = 0;

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      if (product.stock < item.quantity)
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });

      product.stock -= item.quantity;

      if (product.stock === 0)
        product.status = "Out of Stock";
      else if (product.stock < product.minStock)
        product.status = "Low Stock";
      else
        product.status = "In Stock";

      await product.save();

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      await Sale.create({
        invoiceNumber,   // 🔥 store same invoice number
        product: product._id,
        productName: product.name,
        quantity: item.quantity,
        totalPrice: itemTotal,
        date: new Date()
      });
    }

    // res.json({ 
    //   message: "Bulk Sale Completed",
    //   invoiceNumber,
    //   totalAmount
    // });

    res.json({
  message: "Bulk Sale Completed",
  invoiceNumber: invoiceNumber,
  totalAmount: totalAmount
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};