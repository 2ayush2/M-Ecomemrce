import { mongoose } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    // name of the category Eg. Electoronics, Clothing
    name: {
      type: String,
      required: true,
      unique: true,
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    description: {
      type: String,
      required: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
