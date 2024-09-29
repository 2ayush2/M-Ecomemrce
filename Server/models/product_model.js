import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // can be in % or integer
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },

    // clothing, electronics, fooding, etc.
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    brand: {
      type: String,
      default: null,
    },

    stock: {
      type: Number,
      min: 0,
      default: 0,
    },

    // array of image urls
    images: [
      {
        type: String,
        required: true,
      },
    ],

    // how many ratings by the customers
    ratings: {
      averageRating: {
        type: String,
        default: true,
      },

      numberOfRatings: {
        type: String,
        min: 0,
        default: 0,
      },
    },

    reviews: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
