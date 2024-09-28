import express from "express";
const router = express.Router();
import { isProtected } from "../middlewares/authorizeRoute.js";
import checkObjectId from "../utils/checkObjectId.js";

import {
  handlePlaceOrder,
  handleReviewOrderedProduct,
  handleUpdateShippingAddress,
  handleUpdatePaymentMethod,
  handleUpdateOrderStatus,
} from "../controllers/orderController.js";

// create new order
router.post("/order/place", isProtected("admin", "customer"), handlePlaceOrder);

// review the created order
router.get(
  "/order/review/:orderId",
  isProtected(["admin", "customer"]),
  checkObjectId,
  handleReviewOrderedProduct
);

// update the shipping address || default
router.put(
  "/order/shipping/:orderId",
  isProtected(["customer", "admin"]),
  checkObjectId,
  handleUpdateShippingAddress
);

// update the payment method || default to cash on delivery
router.put(
  "/order/payment/:orderId",
  isProtected(["admin", "customer"]),
  checkObjectId,
  handleUpdatePaymentMethod
);

router.put(
  "/order/status/:orderId",
  isProtected(["admin", "customer"]),
  checkObjectId,
  handleUpdateOrderStatus
);
// order is placed and update the status to processing

export default router;
