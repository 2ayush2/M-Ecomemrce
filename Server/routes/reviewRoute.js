import express from "express";
const router = express.Router();

import checkObjectId from "../utils/checkObjectId.js";
import { isProtected } from "../middlewares/authorizeRoute.js";

import {
  handleGetAllReviewsByUser,
  handleCreateReviewToProduct,
  handleGetAllReviewsOfProduct,
  handleDeleteReviewByReviewId,
} from "../controllers/reviewController.js";

router
  .route("/review/:productId")
  .get(
    isProtected(["admin", "customer"]),
    checkObjectId,
    handleGetAllReviewsOfProduct
  )
  .post(
    isProtected(["admin", "customer"]),
    checkObjectId,
    handleCreateReviewToProduct
  );

router.delete(
  "/review/:reviewId",
  isProtected(["admin", "customer"]),
  handleDeleteReviewByReviewId
);

router
  .route("/reviews")
  .get(isProtected(["admin", "customer"]), handleGetAllReviewsByUser);

export default router;
