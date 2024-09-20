import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
// create a folder that contains these data
import users from "./data/user.js";
import products from "./data/products.js";
import orders from "./data/orders.js";
import categories from "./data/categories.js";
import subcategories from "./data/subcategories.js";

import User from "./models/user_model.js";
import Product from "./models/product_model.js";
import Order from "./models/order_model.js";
import Category from "./models/category_model.js";

import connectDb from "./config/db.js";

connectDb();
dotenv.config();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // inserting sample user with first user as admin
    const createdUser = await User.insertMany(users);
    await User.findOneAndUpdate(
      { _id: createdUser[0]._id },
      { $set: { role: "admin" } }
    );

    // inserting sample main categories
    const sampleCategories = categories.map((mainCat) => {
      return { ...categories, parentCategory: null };
    });
    await Category.insertMany(sampleCategories);

    // on progress.......
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
  importData();
}
