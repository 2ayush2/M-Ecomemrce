import User from "../models/user_model.js";
import ApiError from "../utils/ApiError.js";

const handleUserRegistration = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;
    const { address } = req.body;
    const user = await new User({
      username,
      email,
      password,
      phone,
      address,
    });
    await user.save();
    return res.status(200).json({
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      return res
        .status(500)
        .json({ message: "internal server error", err: error.stack });
    }
  }
};

const handleUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("user not found");
    }

    const accessToken = await User.matchPasswordAndGenerateToken(
      email,
      password
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: false, // temporarily
      secure: process.env.NODE_ENV === "development", //
    });

    res.status(200).json({
      message: "user logged in successfull",
      cookie: accessToken,
      user,
    });
  } catch (error) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
};

export { handleUserRegistration, handleUserLogin };
