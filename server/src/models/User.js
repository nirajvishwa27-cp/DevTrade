import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Supabase image URL
    avatar: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    skills: {
      type: [String],
      default: [],
    },

    // For future earning dashboards
    earnings: {
      type: Number,
      default: 0,
    },

    // Projects purchased by this user
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    // Projects uploaded/sold by this user
    sales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    tokenVersion: {
      type: Number,
      default: 0, // used to invalidate refresh tokens
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    resetpasswordToken: String,
    resetpasswordExpires: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
