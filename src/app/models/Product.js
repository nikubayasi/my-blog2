import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  file_url: { type: String, required: true },
  thumbnail: { type: String },
  category: { type: String },
  tags: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
