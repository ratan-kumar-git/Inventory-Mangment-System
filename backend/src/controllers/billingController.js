import Billing from "../models/Billing.js";

export const createBill = async (req, res) => {
  try {
    const { customer, products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in bill" });
    }

    const bill = new Billing({
      shop: req.shop._id,
      user: req.user._id,
      customer,
      products,
      totalAmount,
    });

    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    console.error("Error in createBill:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getBill = async (req, res) => {
  try {
    const bills = await Billing.find({ shop: req.shop._id }).sort({ createdAt: -1 });
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error in getBill:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBillById = async (req, res) => {
  try {
    const bill = await Billing.findOne({
      _id: req.params.id,
      shop: req.shop._id,
    })

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Error in getBillById:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
