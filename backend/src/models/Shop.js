import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true },
    address: String,
    contact: String,
  },
  { timestamps: true }
);

export default mongoose.model("Shop", shopSchema);
