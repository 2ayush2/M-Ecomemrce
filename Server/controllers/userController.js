import User from "../models/user_model.js";

const handleUserRegistration = async (req, res, next) => {
  try {
    const { username, email, password, street, city, zip, province, country } =
      req.body;
    const user = await new User({
      username,
      email,
      password,
    });
    await user.save();

    return res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  }
};

const handleUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await User.matchPasswordAndGenerateToken(
      email,
      password
    );

    res.cookie("accessToken", accessToken);
  } catch (error) {}
};

export { handleUserRegistration };
