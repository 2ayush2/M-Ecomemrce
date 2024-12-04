import User from "../models/user_model.js";
import Product from "../models/product_model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Review from "../models/review_model.js";

// handles get all the reviews by the user
const handleGetAllReviewsByUser = asyncHandler(async (req, res, next) => {
  console.log("i am being invoked");
  const user = req.user;
  if (!user)
    return res.json({ message: "user not found, log in to view the reviews" });

  try {
    const reviews = await Review.find({ user: user.id });
    console.log(reviews);
    if (!reviews) return res.json({ message: "no any reviews by the user" });

    if (reviews.length === 0)
      return res.json({ message: "No reviews from the user" });

    res.status(200).json({
      message: "success",
      reviews,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

// handle get review of particular product
const handleGetAllReviewsOfProduct = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user)
    return res.json({ message: "user not found, log in to view the reviews" });

  try {
    const productId = req.params.productId;
    const reviewOfProduct = await Review.find({
      product: productId,
    });

    res.status(200).json({
      message: "success",
      reviewOfProduct,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

// handle create the reviews for the particular products
const handleCreateReviewToProduct = asyncHandler(async (req, res, next) => {
  console.log("review function invoked");
  const user = req.user;
  if (!user)
    return res.json({ message: "user not found, log in to view the reviews" });

  console.log(user);

  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.json({ message: "body cannot be empty" });
    }

    const productId = req.params.productId;
    if (!productId) return res.json({ message: "invalid id" });

    const review = await Review.create({
      product: productId,
      user: user.id,
      rating,
      comment,
    });

    console.log(review);

    await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: {
          reviews: {
            id: review._id,
            user: user.id,
            rating: rating,
            comment: comment,
          },
        },
      },
      { new: true }
    );

    return res.status(201).json({
      message: "successfully reviewed the product",
      review,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

const handleDeleteReviewByReviewId = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user)
    return res.json({ message: "user not found, log in to view the reviews" });

  try {
    const reviewId = req.params.reviewId;
    if (!reviewId) return res.json({ message: "invalid id" });

    await Review.findOneAndDelete({ _id: reviewId });

    await Product.findOneAndUpdate(
      { "reviews.id": reviewId },
      {
        $pull: {
          reviews: {
            id: reviewId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "review deleted successfull" });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

export {
  handleGetAllReviewsByUser,
  handleCreateReviewToProduct,
  handleGetAllReviewsOfProduct,
  handleDeleteReviewByReviewId,
};
