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
    const products = await Product.find({ shop: req.shop?._id, status: "active" });
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

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      shop: req.shop?._id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.status = 'inactive'
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProductById controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
