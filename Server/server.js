import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import { passport } from "./config/passport-setup.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// importing route controllers
import userRoutes from "./routes/userRoutes.js";
import profileRoute from "./routes/userProfileRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";

// importing middlewares
import { Authentication } from "./middlewares/authorizeRoute.js";
import errorHandler from "./middlewares/errorHandler.js";

// connects our app with mongodb database.
connectDb();
app.use(passport.initialize());

// using auth middlewares
app.use(Authentication);
// setting up routes
app.use("/auth", userRoutes);
app.use("/api/v1", profileRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", cartRoute);

// use of error handler
app.use(errorHandler);
// SERVER IS RUNNING
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
