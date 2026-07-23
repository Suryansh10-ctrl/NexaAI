import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import { randomBytes } from "crypto";


export async function register(req, res) {

    const {name,email,password} = req.body;

    const isuserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { name }],
    });
    console.log("User created");

    if(isuserAlreadyExists){
        return res.status(400).json({
            message: "User already exists",
            success: false,
            err: "User already exists"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    const emailverficationToken = jwt.sign({
        email: user.email
    },process.env.JWT_SECRET)

    // try {
    //     await sendEmail({
    //         to: email,
    //         subject: "Welcome to NexaAI",
    //         text: `Hi, ${name}, Thank you for registering at Perplexity. We're excited to have you on board!`,
    //         html: `<p>Hi, ${name}, </p> Thank you for registering at <strong> NexaAI </strong>. We're excited to have you on board!</p><br>

    //         <p>Please verify your email address by clicking the link below:</p>

    //         <a href="http://localhost:3000/api/auth/verify-email?token=${emailverficationToken}">Verify Email</a>
    
    //         <p>If you didn't create account, please ignore this email.</p>

    //         <p>Best regards, <br> The NexaAI Team</p>
    //     `
    //     })
    // } catch (error) {
    //     console.error("Email sending failed:", error.message)
    // }

    return res.status(201).json({
        message: "User created successfully",
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }
    })



}

export async function verifyEmail(req,res){
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({
            message: "Verification token is required",
            success: false,
            err: "Verification token is required"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
                err: "User not found"
            });
        }

        user.isVerified = true;
        await user.save();

        const html = `
            <h1>Email verified Successfully</h1>
            <p>Your email has been verified. You can now login to your account.</p>
            <a href="http://localhost:3000/login">Go to Login</a>
        `;

        return res.send(html);
    } catch (error) {
        return res.status(400).json({
            message: "Invalid or expired verification token",
            success: false,
            err: error.message
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        
        // Find user
        const user = await userModel.findOne({
            email: email.toLowerCase().trim(),
        });

        // User doesn't exist
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare password
        const isPasswordMatched = await user.comparePassword(password);
        

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        
        // Email verification
        // if (!user.isVerified) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Please verify your email first",
        //     });
        // }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export async function getMe(req,res){
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if(!user){
        return res.status(401).json({
            message: "user not found",
            success: false,
            err: "user not found"
        })
    }

    res.status(200).json({
        message: "user details fetched successfully",
        success: true,
        user
    })
    
}

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate a new verification token
    const verificationToken = jwt.sign(
        {
            email: user.email
        },
        process.env.JWT_SECRET
    );

    const verificationLink =
        `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      text: `Verify your email by visiting: ${verificationLink}`,
      html: `
        <h2>Verify Your Email</h2>
        <p>Click the button below to verify your email.</p>

        <a
          href="${verificationLink}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#4f46e5;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p>If the button doesn't work:</p>
        <p>${verificationLink}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });

    } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export async function logout(req,res){
    res.clearCookie("token");

    res.status(200).json({
        message: "User logged out successfully",
        success: true
    })
}