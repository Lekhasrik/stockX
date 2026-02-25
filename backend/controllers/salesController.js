const Product = require("../models/Product");
const Sale = require("../models/Sale");


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
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.find().populate("product").sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getSalesAnalytics = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: 1 });
    const products = await Product.find();
    
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const totalSales = sales.length;
    const totalProducts = products.length;
    const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaySales = sales.filter(sale => new Date(sale.date) >= today);
    const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    
    // Last 7 days revenue data for line chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const daySales = sales.filter(s => {
        const saleDate = new Date(s.date);
        return saleDate >= date && saleDate < nextDate;
      });
      
      last7Days.push({
        date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        revenue: daySales.reduce((sum, s) => sum + s.totalPrice, 0),
        orders: daySales.length
      });
    }
    
    // Monthly revenue for bar chart
    const monthlyData = {};
    sales.forEach(sale => {
      const d = new Date(sale.date);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      if (!monthlyData[key]) monthlyData[key] = { revenue: 0, orders: 0 };
      monthlyData[key].revenue += sale.totalPrice;
      monthlyData[key].orders += 1;
    });
    const monthlyRevenue = Object.entries(monthlyData).map(([month, data]) => ({
      month, revenue: data.revenue, orders: data.orders
    }));
    
    // Product-wise sales for pie chart
    const productSales = {};
    sales.forEach(sale => {
      if (productSales[sale.productName]) {
        productSales[sale.productName].quantity += sale.quantity;
        productSales[sale.productName].revenue += sale.totalPrice;
      } else {
        productSales[sale.productName] = { quantity: sale.quantity, revenue: sale.totalPrice };
      }
    });
    
    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 6)
      .map(([name, data]) => ({ name, quantity: data.quantity, revenue: data.revenue }));
    
    // Stock status distribution for pie chart
    const inStock = products.filter(p => p.status === "In Stock").length;
    const lowStock = products.filter(p => p.status === "Low Stock").length;
    const outOfStock = products.filter(p => p.status === "Out of Stock").length;
    
    // Category-wise product count for bar chart
    const categoryCount = {};
    products.forEach(p => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    const categoryData = Object.entries(categoryCount).map(([name, count]) => ({ name, count }));
    
    // Recent sales
    const recentSales = sales.slice(-10).reverse().map(s => ({
      productName: s.productName,
      quantity: s.quantity,
      totalPrice: s.totalPrice,
      date: s.date,
      invoiceNumber: s.invoiceNumber
    }));
    
    res.json({
      totalRevenue,
      totalSales,
      todayRevenue,
      todaySalesCount: todaySales.length,
      totalProducts,
      totalStockValue,
      inStock,
      lowStock,
      outOfStock,
      topProducts,
      last7Days,
      monthlyRevenue,
      categoryData,
      recentSales
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addBulkSale = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

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
        invoiceNumber,
        product: product._id,
        productName: product.name,
        quantity: item.quantity,
        totalPrice: itemTotal,
        date: new Date()
      });
    }

    res.json({
      message: "Bulk Sale Completed",
      invoiceNumber,
      totalAmount
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};