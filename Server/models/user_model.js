import mongoose from "mongoose";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import { generateAuthToken } from "../utils/generateAuthToken.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username cannot be empty"],
    },

    email: {
      type: String,
      unique: [true, "this email already exists"],
      required: [true, "email not provided"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    phone: {
      type: Number,
      required: true,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // For google oAuth Users
    googleRefreshToken: {
      type: String,
      select: false,
    },

    // users address for shipping the item
    address: {
      street: { type: String },
      city: { type: String },
      province: { type: String },
      zip: { type: String },
      country: { type: String },
    },

    // user's orders history
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

// // check whether the user has googleAccount or not
// userSchema.methods.hasGoogleAccount() = () => {
//     return !!this.googleId;
// }

// pre saving the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  try {
    const SALT_ROUND = parseInt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password, SALT_ROUND);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// check password for traditional login
userSchema.statics.matchPasswordAndGenerateToken = async function (
  email,
  password
) {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "user not found");
    }
    console.log(user);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ApiError(401, "Invalid credentials");
    }
    const accessToken = await generateAuthToken(user);
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "internal server error"
    );
  }
};

const User = mongoose.model("User", userSchema);
export default User;
