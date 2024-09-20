import User from "../models/user_model.js";
import ApiError from "../utils/ApiError.js";

const handleGetUserProfile = async (req, res, next) => {
  if (!req.user) return next(new ApiError(401, "user not found"));
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      "-password"
    );
    res.status(200).json({
      message: "user fetch successfull",
      user,
    });
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "internal server error"
      )
    );
  }
};

const handleUpdateUserProfile = async (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "user not found"));
  }
  try {
    const { address } = req.body;
    const { phone, username } = req.body || req.query;

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        address,
        phone,
        username,
      },
      { new: true }
    );

    res.status(201).json({
      message: "user updated",
      updatedUser,
    });
  } catch (error) {
    return next(new ApiError(error.statusCode || 500, error.message));
  }
};

export { handleGetUserProfile, handleUpdateUserProfile };
