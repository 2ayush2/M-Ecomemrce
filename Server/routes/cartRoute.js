import express from "express";
import { isProtected } from "../middlewares/authorizeRoute.js";
import checkObjectId from "../utils/checkObjectId.js";
const router = express.Router();

import {
  handleGetUserCartItem,
  handleAddItemsToCart,
  handleUpdateItemsInCart,
  handleDeleteCartItems,
} from "../controllers/cartController.js";

// route for add and get items in cart
router
  .route("/cart")
  .get(isProtected(["customer", "admin"]), checkObjectId, handleGetUserCartItem)
  .post(
    isProtected(["admin", "customer"]),
    checkObjectId,
    handleAddItemsToCart
  );

// route for update and delete cart items
router
  .route("/cart/:productId")
  .put(
    isProtected(["customer", "admin"]),
    checkObjectId,
    handleUpdateItemsInCart
  )
  .delete(
    isProtected(["customer", "admin"]),
    checkObjectId,
    handleDeleteCartItems
  );

export default router;
