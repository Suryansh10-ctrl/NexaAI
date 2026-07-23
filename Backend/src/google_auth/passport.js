import dotenv from "dotenv";
dotenv.config();
console.log(process.env.GOOGLE_CLIENT_ID)

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";

console.log("Callback:", "http://localhost:3000/api/google/google/callback");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/google/google/callback",
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile)
        let user = await userModel.findOne({
          googleId: profile.id,
        });

        if (!user) {
          user = await userModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);