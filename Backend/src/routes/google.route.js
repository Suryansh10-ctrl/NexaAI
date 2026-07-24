import express from "express"
import passport from "passport"
import jwt from"jsonwebtoken"
import {authUser} from "../midddleware/auth.middleware.js"

const router = express.Router();

// step-1: Redirect to google-auth
router.get("/google", (req, res, next) => {
  console.log("Starting Google OAuth...");
  next();
}, passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
}));

router.get('/google/callback', 
    passport.authenticate('google', {session:false}),
    (req,res)=>{
        try{
            const token = jwt.sign({
                id:req.user.id,
                email:req.user.email
            },
                process.env.JWT_SECRET,
                {expiresIn: '7d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.redirect(`${process.env.CLIENT_URL}/`);

        }catch(err){
            console.error("google login error: ", err)
            res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`)
        }
    })

router.get('/get-me',authUser, (req,res)=> {
    res.json({
        success: true,
        user: req.user
    })
})

export default router;