import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true, index: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },

    // pricing
    buyPrice: { type: Number, required: true, min: 0 },
    sellPrice: { type: Number, required: true , min: 0 },
    mrp: { type: Number, required: true, min: 0 },

    // stock
    stock: { type: Number, default: 0, min: 0 },
    unit: { type: String, enum: ["pcs", "kg", "litre", "box", "packet"], default: "pcs" },
    lowStockLimit: { type: Number, default: 5, min: 0 },

    // status
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);



export default mongoose.model("Product", productSchema);
