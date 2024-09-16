import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: isProduction ? undefined : err.stack,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    stack: isProduction ? undefined : err.stack,
  });
};

export default errorHandler;
