import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },

    // pricing
    buyPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    mrp: { type: Number, required: true },

    // stock
    stock: { type: Number, default: 0 },
    unit: { type: String, default: "pcs" }, // free text (pcs, kg, litre, etc.)
    lowStockLimit: { type: Number, default: 5 },

    // status
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);



export default mongoose.model("Product", productSchema);
