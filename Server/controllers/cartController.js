import Product from "../models/product_model.js";
import Cart from "../models/cart_model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const handleGetUserCartItem = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.json({
      message: "you need to be logged in",
    });
  }
  try {
    const cartItems = await Cart.findOne({ user: user.id });

    return res.json({
      message: "success",
      cartItems,
    });
  } catch (error) {
    return next(
      ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

const handleAddItemsToCart = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.json({
      message: "cannot add to cart, need to log in first",
    });
  }

  try {
    const { productId, quantity } = req.body;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.json({
        message: "product not found",
      });
    }
    // if users cart already exists
    const cart = await Cart.findOneAndUpdate(
      {
        user: user.id,
        "items.product": productId,
      },
      {
        $inc: { "items.$.quantity": quantity },
        totalPrice: product.price * quantity,
      },
      { new: true }
    );

    // if cart does not exists, create new one
    if (!cart) {
      const newCart = await Cart.create({
        user: user.id,
        items: [{ product: productId, quantity }],
        totalPrice: product.price * quantity,
      });

      return res.status(200).json({
        message: "item added successfully, ",
        newCart,
      });
    }

    return res.status(200).json({
      message: "item pushed successfully",
      cart,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statuCode || 500,
        error.message || "internal server error"
      )
    );
  }
});

const handleUpdateItemsInCart = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) return res.json({ message: "user not found, cannot update" });

  console.log(user);
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: user.id });

    if (!cart) return res.json({ message: "cart not found to update" });

    const updatedCart = await Cart.findOneAndUpdate(
      { user: user.id, "items.product": productId },
      { $inc: { "items.$.quantity": quantity } },
      { new: true }
    );

    res.status(201).json({
      message: "successfully updated quantity",
      updatedCart,
    });
  } catch (error) {
    return next(
      ApiError(error.statuCode || 500, error.message || "internal server error")
    );
  }
});

export { handleGetUserCartItem, handleAddItemsToCart, handleUpdateItemsInCart };
