import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Order from "../models/order_model.js";
import Product from "../models/product_model.js";

import calculatePrice from "../utils/calcPrice.js";
import User from "../models/user_model.js";

// post request
const handlePlaceOrder = asyncHandler(async (req, res, next) => {
  const user = req.user;
  try {
    const { product, quantity, shippingAddress } = req.body;

    const isProduct = await Product.findById(product);

    const newOrder = await Order.insertMany({
      user: user.id,
      product: isProduct._id,
      quantity,
      shippingAddress,
      totalAmount: calculatePrice(product, quantity),
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    return res.status(201).json({
      message: "order placed, please review the product",
      newOrder,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

// get request
const handleReviewOrderedProduct = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const userId = await User.findById(user.id);
  if (!userId) {
    return res.json({ message: " invalid user " });
  }

  try {
    const { orderId } = req.params;
    const placedOrder = await Order.findById(orderId).populate("product");
    if (!placedOrder) {
      return res
        .status(404)
        .json({ message: " You haven't placed an order yet" });
    }

    return res.status(200).json({
      message: "success",
      placedOrder,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

// put request by orderId
const handleUpdateShippingAddress = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { newAddress } = req.body;

    const order = await Order.findById(orderId).populate("user");
    if (!order) return res.status(404).json({ message: "Order not foudn" });

    order.shippingAddress = newAddress;

    await order.save();
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

// put request to update the payment method
const handleUpdatePaymentMethod = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { paymentMethod } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "invalid order" });

    order.paymentMethod = paymentMethod;
    order.paymentStatus = "Pending"; // will update later

    await order.save();
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

// put request to update the order Status
const handleUpdateOrderStatus = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body; // can be any mediem not only req.body

    const order = await Order.findById(orderId);

    order.orderStatus = newStatus;
    order.statusUpdates.push({ status: newStatus });

    if (newStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

export {
  handlePlaceOrder,
  handleReviewOrderedProduct,
  handleUpdateShippingAddress,
  handleUpdatePaymentMethod,
  handleUpdateOrderStatus,
};
