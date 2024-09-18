import express from "express";
const router = express.Router();
// import { asyncHandler } from "../utils/asyncHandler.js";
import {
  handleUserRegistration,
  handleUserLogin,
} from "../controllers/userController.js";

import authorizeAdmin, { isProtected } from "../middlewares/authorizeRoute.js";
import handleUserLogout from "../controllers/userController.js";

// import passport from "passport";
import { passport } from "../config/passport-setup.js";
router.post("/register", handleUserRegistration);
router.post("/login", handleUserLogin);

router.get("/logout", handleUserLogout);

// Routes for handling Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;
    const user = req.user;
    res.cookie("accessToken", token);
    res.status(200).json({
      message: "user logged in using google oAuth",
      user,
      token,
    });
  }
);

export default router;
