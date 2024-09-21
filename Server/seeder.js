import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
// create a folder that contains these data
import users from "./data/users.js";
import products from "./data/products.js";
// import orders from "./data/orders.js"; // haven't done yet
import categories from "./data/categories.js";
import subcategories from "./data/subcategories.js";

// import all the models to be seeded
import User from "./models/user_model.js";
import Product from "./models/product_model.js";
// import Order from "./models/order_model.js";
import Category from "./models/category_model.js";

import connectDb from "./config/db.js";

connectDb();
const importData = async () => {
  try {
    await Category.deleteMany();
    await User.deleteMany();
    // await Order.deleteMany();

    // inserting sample user with first user as admin
    const createdUser = await User.insertMany(users);
    await User.findOneAndUpdate(
      { _id: createdUser[0]._id },
      { $set: { role: "admin" } }
    );

    // inserting main categories
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

const productWithCategories = async () => {
  try {
    await Product.deleteMany();

    // inserting main categories first
    await Category.insertMany(categories);

    // now inserting sub categories based on main categories
    const categoriesMap = {};

    for (const subCategory of subcategories) {
      let parentCategoryId = null;

      // here, parentCategory = Electronics (eg.)
      const parentCategory = subCategory.parentCategory;
      if (parentCategory) {
        const parentCategoryDoc = await Category.find({ name: parentCategory });
        if (parentCategoryDoc) {
          parentCategoryId = parentCategoryDoc._id;
        } else {
          console.error(
            `parent category not found  for sub cat: ${subCategory.name}`
          );
        }
      }

      const insertedCategory = await Category.create({
        name: subCategory.name,
        description: subCategory.description,
        isActive: subCategory.isActive,
        category: parentCategoryId,
      });
      categoriesMap[subCategory.name] = insertedCategory._id;
    }

    // now inserting products
    for (const product of products) {
      const categoryId = categoriesMap[product.category];

      if (!categoryId) {
        cosnole.error(`sub category not found for the product ${product.name}`);
        continue;
      }
      await Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        category: categoryId,
        brand: product.brand,
        stock: product.stock,
        images: product.images,
        ratings: product.ratings,
      });
    }
    console.log(`product model seeded`.green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log(`Data destroyed`.red.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  await importData();
  await productWithCategories();
}
