import Category from "../models/category_model.js";
import Product from "../models/product_model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET PRODUCTS

// get all the products with search query if provided (done)
const handleGetAllProducts = asyncHandler(async (req, res, next) => {
  const PAGE_SIZE = process.env.PAGE_SIZE_LIMIT;
  if (!PAGE_SIZE) {
    return res.json({ error: "process env ma tw vetina maile" });
  }
  const PAGE = req.query.p || 1;
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } } // if true
      : {}; // else empty

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * (PAGE - 1));

    res.status(200).json({
      products,
      count,
      PAGE,
      numberOfPages: Math.ceil(count / PAGE_SIZE),
    });
  } catch (error) {
    return next(new ApiError(error.statusCode, error.stack));
  }
});

// get selected products based on their id (done)
const handleGetProductById = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  if (!productId) return res.json({ message: "invalid product id" });

  try {
    const product = await Product.findById(productId);
    res.status(200).json({
      message: "success",
      product,
    });
  } catch (error) {
    return next(new ApiError(error.statusCode, error.stack));
  }
});

// get all the products from higher ratings to lower ratings (done)
const handleGetTopProducts = asyncHandler(async (req, res, next) => {
  const PAGE = parseInt(req.query.p);
  const PAGE_SIZE = parseInt(process.env.PAGE_SIZE_LIMIT);

  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const topProducts = await Product.find({ ...keyword })
      .sort({ ratings: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * (PAGE - 1));

    res.status(201).json({
      products: topProducts,
      numberOfProducts: count,
      PAGE,
      numberOfPages: Math.ceil(count / PAGE_SIZE),
    });
  } catch (error) {
    return next(new ApiError(error.statusCode || 500, err.message));
  }
});

// get all the products based on filter provided ()
const handleGetProductsByFilter = asyncHandler(async (req, res, next) => {
  const PAGE_SIZE = parseInt(process.env.PAGE_SIZE_LIMIT) || 16;
  const PAGE = req.query.p;

  try {
    // const category = req.query.category;
    const subcategory = req.query.subcategory;
    const sortByPrice = req.query.sortByPrice;

    // const mainCategory = await Category.find({ name: category });

    const subCategories = await Category.findOne({ name: subcategory });

    const filter = {};
    if (subcategory) filter.category = subCategories._id;

    const sort = {};
    if (sortByPrice) {
      sort.price = sortByPrice === "asc" ? 1 : 1;
    }

    const filteredProduct = await Product.find(filter)
      .sort(sort)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * (PAGE - 1));

    console.log(filteredProduct);

    return res.status(200).json({
      success: true,
      products: filteredProduct,
      count: filteredProduct.length,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.stack || "internal server error"
      )
    );
  }
});

// POST PRODUCTS (done)
const handleCreateNewProduct = asyncHandler(async (req, res, next) => {
  const category = req.query.category;
  const subCategory = req.query.subcategory;

  try {
    // const { name, price, description, brand, stock, images } = req.body;
    const products = req.body.products; // expecting an array of products
    const mainCategory = await Category.findOne({ name: category }); // will get from dropdown list
    if (!mainCategory) {
      return res.status(404).json({ message: "Main category not found" });
    }

    // wil get this in string format from dropdown list
    const subCategoryDoc = await Category.findOne({
      name: subCategory,
      parentCategory: mainCategory._id,
    });
    if (!subCategoryDoc) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    const productWithCategory = products.map((product) => ({
      name: product.name,
      price: product.price,
      description: product.description,
      brand: product.brand,
      stock: product.stock,
      images: product.images,
      category: subCategoryDoc._id,
    }));

    // only add if there are something to add
    if (productWithCategory.length > 0) {
      const products = await Product.insertMany(productWithCategory);
      res.status(201).json({
        message: "success",
        products: products,
      });
    } else {
      return res.status(400).json({
        message: "no new products to add. All Category exists",
      });
    }
  } catch (error) {
    return next(new ApiError(error.statusCode || 500, error.stack));
  }
});

export {
  handleGetAllProducts,
  handleGetProductById,
  handleGetTopProducts,
  handleGetProductsByFilter,
  handleCreateNewProduct,
};

