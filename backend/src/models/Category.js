import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Ensure category names are unique per shop
categorySchema.index({ shop: 1, name: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
