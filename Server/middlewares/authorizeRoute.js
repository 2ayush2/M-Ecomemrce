import ApiError from "../utils/ApiError.js";
import { validateToken } from "../utils/generateAuthToken.js";

export async function Authentication(req, res, next) {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) return next();

  try {
    const decoded = await validateToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("accessToken");
      return res
        .status(401)
        .json({ message: "Token Expired, please log in again" });
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }
}

// authorization for normal customers
export const isProtected = (requiredRoles) => (req, res, next) => {
  try {
    const { user } = req;
    if (!user || !requiredRoles.includes(user.role)) {
      //   next(new ApiError(403, "Access Denied"));
      return res.status(403).json({
        success: false,
        status: "logged out",
      });
    }
    next();
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
    // return res.json({
    //   message: error.statck,
    // });
  }
};

// authorization for admin
const authorizeAdmin = () => {
  return (req, res, next) => {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({
        messge: "access denied, forbidden",
      });
    }
    next();
  };
};

export default authorizeAdmin;
