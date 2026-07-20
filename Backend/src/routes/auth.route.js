import { Router } from "express";
import { getMe, login, register, resendVerificationEmail, verifyEmail, logout} from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authUser } from "../midddleware/auth.middleware.js";


const authRouter = Router();

authRouter.post("/register", registerValidator, register);

authRouter.get('/verify-email', verifyEmail);

authRouter.post(
  "/login",
  loginValidator,
  login
);

authRouter.post('/resend-verify-email', resendVerificationEmail)

authRouter.get('/get-me', authUser,getMe)

authRouter.post('/logout', logout)

export default authRouter;