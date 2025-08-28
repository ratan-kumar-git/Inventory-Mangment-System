import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who recorded the purchase
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },

    invoiceNumber: { type: String, required: true }, // supplier bill no.

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        buyPrice: { type: Number, required: true },   // per unit cost
        subtotal: { type: Number, required: true },   // quantity * buyPrice
      },
    ],

    totalAmount: { type: Number, required: true }, // before discount+tax

    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "partial"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank"],
      default: "cash",
    },
  },
  { timestamps: true }
);

// Indexes for fast queries
purchaseSchema.index({ shop: 1 });
purchaseSchema.index({ supplier: 1 });

export default mongoose.model("Purchase", purchaseSchema);
