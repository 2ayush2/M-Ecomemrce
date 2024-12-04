import express from "express";
const router = express.Router();
import authorizeAdmin, { isProtected } from "../middlewares/authorizeRoute.js";
import {
  handleGetUserProfile,
  handleUpdateUserProfile,
} from "../controllers/profileController.js";

router
  .route("/users")
  .get(isProtected(["admin", "customer"]), handleGetUserProfile)
  .put(isProtected(["admin", "customer"]), handleUpdateUserProfile);

// need to create get all users for admin

export default router;
