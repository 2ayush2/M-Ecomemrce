import express from "express";
const router = express.Router();
// import { asyncHandler } from "../utils/asyncHandler.js";
import {
  handleUserRegistration,
  handleUserLogin,
} from "../controllers/userController.js";

router.post("/register", handleUserRegistration);
router.post("/login", handleUserLogin);

export default router;
