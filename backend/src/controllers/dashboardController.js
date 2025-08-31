import Product from "../models/Product.js";
import Billing from "../models/Billing.js";
import mongoose from "mongoose";

export const getMonthlyDashboard = async (req, res) => {
  try {
    const shopId = req.shop._id;

    // 1. Total Products
    const totalProducts = await Product.countDocuments({ shop: shopId });

    // 2. Total Sales (sum of all billings)
    const totalSalesAgg = await Billing.aggregate([
      { $match: { shop: new mongoose.Types.ObjectId(shopId) } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    // 3. Today's Sales
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todaySalesAgg = await Billing.aggregate([
      {
        $match: {
          shop: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startOfDay }
        }
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const todaySales = todaySalesAgg[0]?.total || 0;

    // 4. Low Stock Items
    const lowStockCount = await Product.countDocuments({
      shop: shopId,
      $expr: { $lte: ["$stock", "$lowStockLimit"] }
    });

    res.json({
      totalProducts,
      totalSales,
      todaySales,
      lowStockCount,
    });
  } catch (error) {
    console.error("Error in getDashboardData:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
