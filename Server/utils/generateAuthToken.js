import jwt from "jsonwebtoken"; // Ensure you have jsonwebtoken installed
import ApiError from "./ApiError.js";

const generateAuthToken = async (user) => {
  try {
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const JWT_KEY = process.env.JWT_SECRET;
    if (!JWT_KEY) throw new ApiError(500, "JWT_SECRET not defined");

    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_KEY, { expiresIn: "20m" }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });

    return token;
  } catch (err) {
    console.error("Token Generation Error: ", err);
    throw err;
  }
};

const validateToken = (accessToken) => {
  const JWT_KEY = process.env.JWT_SECRET;

  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, JWT_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

export { generateAuthToken, validateToken };
