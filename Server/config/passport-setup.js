import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user_model.js";
import { generateAuthToken } from "../utils/generateAuthToken.js";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // check current user or not
        const currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          return cb(null, currentUser);
        }

        const user = {
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        };

        const newUser = await User.create({
          username: user.username,
          googleId: user.googleId,
          email: user.email,
          isVerified: true,
        });

        

        const token = await generateAuthToken(newUser);
        done(null, { token, newUser });
      } catch (error) {
        done(err, false);
      }
    }
  )
);

export { passport };
