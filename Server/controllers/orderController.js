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
      totalAmount: calculatePrice(isProduct, quantity),
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
      status: "success",
      message: "now, forward the user to select payment method",
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
  const { orderId } = req.params;
  const { newAddress } = req.body;

  if (!newAddress) {
    return res.status(400).json({ message: "Invalid address" });
  }

  try {
    const order = await Order.findById(orderId).populate("user");
    if (!order) return res.status(404).json({ message: "Order not foudn" });

    order.shippingAddress = newAddress;

    await order.save();
    return res
      .status(200)
      .json({ message: "address updated successfuly", placedOrder: order });
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

    const formatedPayment =
      paymentMethod === "Cash On Delivery" ? "Cash on Delivery" : paymentMethod;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "invalid order" });

    order.paymentMethod = formatedPayment;

    await order.save();

    return res.status(200).json({
      message: "payment method updated successfully, confirm the order",
      order,
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

// put request to update the order Status
const handleUpdateOrderStatus = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  if (!orderId) return res.status(400).json({ message: "bad request" });

  const { newStatus } = req.body; // can be any medium not only req.body
  if (!newStatus)
    return res.status(400).json({ message: "status cannot be empty" });

  try {
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = newStatus;
    order.statusUpdates.push({ status: newStatus });

    if (newStatus === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentStatus = "Paid";
    }
    await order.save();
    return res
      .status(200)
      .json({ message: "status updated", trackingId: order._id });
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
