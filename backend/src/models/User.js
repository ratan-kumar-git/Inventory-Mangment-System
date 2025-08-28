import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
