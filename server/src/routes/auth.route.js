import express from 'express';
import { login, logout, signup, forgotPassword, resetPassword, sendOtp, verifyOtp, getMyProfile} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
// router.post("/signup/magiclink", sendMagicLink);
// router.get("/magiclink/callback", verifyMagicLink);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);


router.post("/login", login);
router.post("/logout", logout);

// router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/getMyProfile", authMiddleware, getMyProfile);

export default router;