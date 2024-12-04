import Category from "../models/category_model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const handleAddNewCategory = asyncHandler(async (req, res, next) => {
  //   const { name, description } = req.body || req.query;
  const categories = req.body.categories; // expectung an array of categories
  if (!categories)
    return res.status(400).json({ message: "fields cannot be empty " });
  try {
    const categoryNames = categories.map((cat) => cat.name); // fetch only names from each category

    // finding existing category in the already existing category
    const existingCategory = await Category.find({
      name: { $in: categoryNames },
    });

    // extracting names of the category from existing category
    const existingCategoryNames = existingCategory.map((cat) => cat.name);

    // new categories after filtering
    const newCategories = categories.filter(
      (cat) => !existingCategoryNames.includes(cat.name)
    );

    // only add if there are something to add
    if (newCategories.length > 0) {
      const mainCategory = await Category.insertMany(newCategories);
      return res.status(201).json({
        message: "successfully added new categories",
        mainCategories: mainCategory,
      });
    } else {
      return res.status(400).json({
        message: "no new categories to add. All Category exists",
      });
    }
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
});

const handleAddNewSubCategory = asyncHandler(async (req, res, next) => {
  //   const { name, description } = req.body || req.query;
  const category = req.query.category;
  const subCategories = req.body.subcategories; // expect to send array of subcategories

  if (!subCategories) return next(new ApiError(400, "fields cannot be empty"));

  const mainCategory = await Category.findOne({ name: category });
  if (!mainCategory)
    return res.status(400).json({ message: "this category does not exists" });

  try {
    const subCategoryNames = subCategories.map((cat) => cat.name); // fetch only names from each category

    // finding existing sub category in the already existing category
    const existingSubCategory = await Category.find({
      name: { $in: subCategoryNames },
    });

    // extracting names of the sub category from existing category
    const existingSubCategoryNames = existingSubCategory.map((cat) => cat.name);

    // new categories after filtering
    const newSubCategories = subCategories.filter(
      (cat) => !existingSubCategoryNames.includes(cat.name)
    );

    // adding parentCategory id to the new sub category before saving to the database
    const newSubCategoryWithParents = newSubCategories.map((subCategory) => ({
      name: subCategory.name,
      description: subCategory.description,
      parentCategory: mainCategory._id,
    }));

    // only add if there are something to add
    if (newSubCategoryWithParents.length > 0) {
      const subCategory = await Category.insertMany(newSubCategoryWithParents);
      return res.status(201).json({
        message: "successfully added new categories",
        subCategories: subCategory,
      });
    } else {
      return res.status(400).json({
        message: "no new subcategories to add. All Category exists",
      });
    }
  } catch (error) {
    return next(new ApiError(error.statusCode || 500, error.stack));
  }
});

const handleGetCategoriesAndSub = asyncHandler(async (req, res, next) => {
  const mainCategories = await Category.find({ parentCategory: null });
  const mainCategoriesWithSubCategories = await Promise.all(
    mainCategories.map(async (mainCat) => {
      const subCategories = await Category.find({
        parentCategory: mainCat._id,
      });
      return {
        mainCategory: mainCat,
        subCategories,
      };
    })
  );

  res.json({
    message: "success",
    categories: mainCategoriesWithSubCategories,
  });
});

export {
  handleAddNewCategory,
  handleAddNewSubCategory,
  handleGetCategoriesAndSub,
};
