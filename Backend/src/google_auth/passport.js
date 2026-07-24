import dotenv from "dotenv";
dotenv.config();
console.log(process.env.GOOGLE_CLIENT_ID)
console.log("Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Callback URL:", "https://nexaai-mb5t.onrender.com/api/google/google/callback");

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://nexaai-mb5t.onrender.com/api/google/google/callback",
        },
        
        async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile)
        let user = await userModel.findOne({
            email: profile.emails[0].value,
        });

        if (!user) {
            user = await userModel.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
            });
        } else if (!user.googleId) {
            user.googleId = profile.id;
            user.avatar = profile.photos[0].value;
            await user.save();
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);