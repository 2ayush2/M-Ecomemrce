import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
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
    const hash = await bcrypt.hash(user.password, process.env.SALT_ROUNDS);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// check password for traditional login
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new ApiError(401, "user not found");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new ApiError(401, "Invalid credentials");
      }
      const accessToken = generateAuthToken(user);
      return accessToken;
    } catch (error) {
      throw new ApiError(error);
    }
  }
);

const User = mongoose.model("User", userSchema);
export default User;
