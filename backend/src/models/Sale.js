import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    
    invoiceNumber: { type: String, required: true }, // unique per shop

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        sellPrice: { type: Number, required: true },
        subtotal: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true }, // sum of subtotals
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi"],
      default: "cash",
    },

    status: {
      type: String,
      enum: ["completed", "pending", "cancelled"],
      default: "completed",
    },
  },
  { timestamps: true }
);

// Indexes
saleSchema.index({ shop: 1, createdAt: -1 });
saleSchema.index({ user: 1, createdAt: -1 });


export default mongoose.model("Sale", saleSchema);
