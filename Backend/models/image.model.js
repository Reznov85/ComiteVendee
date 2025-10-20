import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
