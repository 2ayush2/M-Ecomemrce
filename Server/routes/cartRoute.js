import express from "express";
import { isProtected } from "../middlewares/authorizeRoute.js";
import checkObjectId from "../utils/checkObjectId.js";
const router = express.Router();

import {
  handleGetUserCartItem,
  handleAddItemsToCart,
  handleUpdateItemsInCart,
} from "../controllers/cartController.js";

router
  .route("/cart")
  .get(isProtected(["customer", "admin"]), checkObjectId, handleGetUserCartItem)
  .post(
    isProtected(["admin", "customer"]),
    checkObjectId,
    handleAddItemsToCart
  );

router
  .route("/cart/:productId")
  .put(
    isProtected(["customer", "admin"]),
    checkObjectId,
    handleUpdateItemsInCart
  )
  .delete();

export default router;
