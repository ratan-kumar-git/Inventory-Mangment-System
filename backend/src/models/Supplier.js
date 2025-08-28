import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, required: true },
    address: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Indexes for faster search
supplierSchema.index({ shop: 1, name: 1 });

export default mongoose.model("Supplier", supplierSchema);
