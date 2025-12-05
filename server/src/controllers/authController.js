import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndCookie } from "../utils/generateToken.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
import { sendWelcomeEmail } from "../mailtrap/emails.js";
import { sendPasswordResetEmail } from "../mailtrap/emails.js";
import { sendResetSuccessEmail } from "../mailtrap/emails.js";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await user.save();
    generateTokenAndCookie(res, user._id);

    try {
        await sendVerificationEmail(user.email, verificationToken);
    } catch (emailError) {
        console.error("Resend Failed:", emailError);
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({ message: "Error sending verification email. Please try again." });
    }

    return res.status(201).json({
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    user.verificationExpiresAt = undefined; // Clear the expiration date
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
  console.error("Error during email verification:", error);
  return res.status(500).json({ message: "Internal server error" });
}
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }
    //npm install bcryptjs cookie-parser cors crypto dotenv express jsonwebtoken mailtrap mongoose

    generateTokenAndCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    user.resetpasswordToken = resetToken;
    user.resetpasswordExpires = resetExpiresAt;
    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}` // Changed from Client_URL
    );
    res.status(200).json({
      message: "Password reset token generated",
      resetToken,
    });
  } catch (error) {
    console.error("Error during forgot password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({
      resetpasswordToken: token,
      resetpasswordExpires: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);

    user.password = hashPassword;
    user.resetpasswordToken = undefined;
    user.resetpasswordExpires = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Error during authentication check:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
