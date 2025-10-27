import mongoose from "mongoose";

const journeeSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
  championnat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Championnat",
    required: true,
  },
  rencontres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rencontre",
    },
  ],
});

export default mongoose.model("Journee", journeeSchema);
