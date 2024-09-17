import express from "express";
const app = express();
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// importing routes
import userRoutes from "./routes/userRoutes.js";

// importing middlewares
import errorHandler from "./middlewares/errorHandler.js";

// connects our app with mongodb database.
connectDb();

// setting up routes
app.use("/api", userRoutes);

// use of error handler
app.use(errorHandler);
// SERVER IS RUNNING
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
