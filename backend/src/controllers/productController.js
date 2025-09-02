import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      buyPrice,
      sellPrice,
      mrp,
      stock,
      unit,
      lowStockLimit,
    } = req.body;

    // Required field checks
    if (!productName)
      return res.status(400).json({ message: "Product name is required" });
    if (!buyPrice)
      return res.status(400).json({ message: "Buy price is required" });
    if (!sellPrice)
      return res.status(400).json({ message: "Sell price is required" });
    if (!stock) return res.status(400).json({ message: "Stock is required" });
    if (!unit) return res.status(400).json({ message: "Unit is required" });

    const newProduct = new Product({
      productName,
      buyPrice,
      sellPrice,
      mrp,
      stock,
      unit,
      lowStockLimit,
      shop: req.shop?._id,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.log("Error in createProduct controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ shop: req.shop?._id });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getProducts controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      shop: req.shop?._id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProductById controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      shop: req.shop?._id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // update data
    product.productName = req.body.productName || product.productName;
    product.buyPrice = req.body.buyPrice ?? product.buyPrice;
    product.sellPrice = req.body.sellPrice ?? product.sellPrice;
    product.mrp = req.body.mrp ?? product.mrp;
    product.stock = req.body.stock ?? product.stock;
    product.unit = req.body.unit || product.unit;
    product.lowStockLimit = req.body.lowStockLimit ?? product.lowStockLimit;

    await product.save();

    res.status(200).json({ product });
  } catch (error) {
    console.log("Error in updateProduct controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addStock = async (req, res) => {
  try {
    const { stock } = req.body;

    // Ensure stock is a valid positive number
    if (!stock || isNaN(stock) || stock <= 0) {
      return res.status(400).json({ message: "Invalid stock quantity" });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      shop: req.shop?._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add stock 
    product.stock += Number(stock);
    await product.save();

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error in addStock controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      shop: req.shop?._id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in getProductById controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
