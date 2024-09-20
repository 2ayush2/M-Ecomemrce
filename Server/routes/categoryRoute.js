import express from "express";
const router = express.Router();
import authorizeAdmin, { isProtected } from "../middlewares/authorizeRoute.js";
import {
  handleAddNewCategory,
  handleAddNewSubCategory,
  handleGetCategoriesAndSub,
} from "../controllers/categoryController.js";

/**
 * Important Note:
 * Here, Creating category is only allowed to admin
 * But for development, any user is allowed
 */

router
  .route("/categories")
  .get(
    authorizeAdmin(),
    isProtected(["admin", "customer"]),
    handleGetCategoriesAndSub
  )
  .post(
    isProtected(["admin"]), // edit to only admin
    handleAddNewCategory
  );

router.post(
  "/subcategories",
  authorizeAdmin(),
  isProtected(["admin"]), // edit to only admin
  handleAddNewSubCategory
);

export default router;
