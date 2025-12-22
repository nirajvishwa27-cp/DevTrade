import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndCookie } from "../utils/generateToken.js";
import User from "../models/user.model.js"
import axios from "axios";
import jwt from "jsonwebtoken";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const response = await axios.post(
      "https://api.mojoauth.com/users/emailotp",
      { email },
      {
        headers: {
          "X-API-KEY": process.env.MOJOAUTH_API_KEY,
        },
      }
    );

    return res.status(200).json({
      message: "OTP sent to email",
      data: response.data,
    });

  } catch (err) {
    const status = err.response ? err.response.status : 500;
    const msg = err.response ? err.response.data : err.message;
    
    return res.status(status).json({ error: msg });
  }
};

//   try {
//     const { state_id, otp, name, password} = req.body;

//     const response = await axios.post(
//       "https://api.mojoauth.com/users/emailotp/verify",
//       { state_id, otp },
//       {
//         headers: {
//           "X-API-KEY": process.env.MOJOAUTH_API_KEY
//         }
//       }
//     );

//     // OTP failed
//     if (!response.data.authenticated) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // OTP passed
//     const verifiedEmail = response.data.user.email;

//     // Lookup or create user
//     let user = await User.findOne({ email: verifiedEmail });

//     if (!user) {
      
//       user = await User.create({ email: verifiedEmail, name, password });
//     }

//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d"
//     });

//     return res.status(200).json({
//       message: "OTP Verified",
//       user,
//       token
//     });

//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

export const verifyOtp = async (req, res) => {
  try {
    const { state_id, otp } = req.body;

    const response = await axios.post(
      "https://api.mojoauth.com/users/emailotp/verify",
      { state_id, otp },
      {
        headers: {
          "X-API-KEY": process.env.MOJOAUTH_API_KEY,
        },
      }
    );

    if (!response.data.authenticated) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const verifiedEmail = response.data.user.email;

    // Generate a temporary token valid ONLY for signup (not login)
    const tempToken = jwt.sign(
      { email: verifiedEmail },
      process.env.TEMP_JWT_SECRET,
      { expiresIn: "10m" }
    );
    

    return res.status(200).json({
      message: "OTP Verified",
      email: verifiedEmail,
      tempToken,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// export const verifyOtp = async (req, res) => {
//   const { state_id, otp, name } = req.body;

//   const response = await axios.post(
//     "https://api.mojoauth.com/users/emailotp/verify",
//     { state_id, otp },
//     { headers: { "X-API-KEY": process.env.MOJOAUTH_API_KEY } }
//   );

//   if (!response.data.authenticated) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   const email = response.data.user.email;

//   let user = await User.findOne({ email });
//   if (!user) {
//     user = await User.create({
//       email,
//       name,
//       isEmailVerified: true
//     });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d"
//   });

//   res.status(200).json({ message: "Logged in", token, user });
// };




// export const signup = async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     if (!email || !password || !name) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashPassword = await bcryptjs.hash(password, 10);
//     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

//     const user = new User({
//       email,
//       password: hashPassword,
//       name,
//       verificationToken,
//       verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
//     });

//     await user.save();
//     generateTokenAndCookie(res, user._id);

//     return res.status(201).json({
//       message: "User created successfully",
//       user: {
//         ...user._doc,
//         password: undefined,
//       }
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const signup = async (req, res) => {
  try {
    const { name, password, tempToken } = req.body;


    if (!name || !password || !tempToken) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify the tempToken
    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.TEMP_JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid signup session" });
    }


    const verifiedEmail = decoded.email;

    // Check if user exists
    const existingUser = await User.findOne({ email: verifiedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create hashed password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: verifiedEmail,
      password: hashedPassword,
      isVerified: true, // MojoAuth verified email already
    });
    

    // Create login token (normal JWT)
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    

    return res.status(201).json({
      message: "Signup successful",
      token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
    

  } catch (err) {
    return res.status(500).json({ error: err.message });
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


export const getMyProfile = async (req, res) => {
  try {
    const id = req.user.id;  // coming from auth middleware

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ user });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "server error" });
  }
};


