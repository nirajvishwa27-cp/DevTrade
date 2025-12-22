import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    price: { type: Number, required: true },
    techStack: [String], // ["React", "Node", "ML"]
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    // "Web", "ML", "Android", etc.

    thumbnail: { type: String }, // image URL (Supabase)
    images: [String], // additional previews
    fileUrl: { type: String }, // downloadable file after purchase

    rating: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "not_active"], default: "active" },
    salesCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
