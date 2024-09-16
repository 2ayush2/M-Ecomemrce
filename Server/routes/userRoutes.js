import express from "express";
const router = express.Router();
import { asyncHandler } from "../utils/asyncHandler.js";
import { handleUserRegistration } from "../controllers/userController.js";

router.get("/register", handleUserRegistration);

router.post("/login");

export default router;
