import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    shop: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Shop", 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    customer: {
      cName: { type: String, required: true, trim: true },
      cContact: { type: String, required: true, trim: true },
      cAddress: { type: String, required: true, trim: true },
    },

    products: [
      {
        productId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        productName: { type: String, required: true },
        buyPrice: { type: Number, required: true, min: 0 },
        sellPrice: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        unit: { 
          type: String, 
          enum: ["pcs", "kg", "litre", "box", "packet"], 
          default: "pcs" 
        },
        subtotal: { type: Number, required: true, min: 0 },
      }
    ],

    totalAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Indexes for performance
billingSchema.index({ shop: 1, createdAt: -1 });
billingSchema.index({ user: 1, createdAt: -1 });
billingSchema.index({ "customer.cName": 1 });

export default mongoose.model("Billing", billingSchema);
