import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Esewa", "Cash on Delivery"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    statusUpdates: [
      {
        status: {
          type: String,
          updatedAt: { type: Date, default: Date.now() },
        },
      },
    ],
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
