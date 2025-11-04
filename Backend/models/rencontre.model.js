import mongoose from "mongoose";

const rencontre = new mongoose.Schema({
  equipeA: { type: String, required: true },
  equipeB: { type: String, required: true },
  scoreA: { type: Number },        // facultatif au début
  scoreB: { type: Number },
  horaire: { type: String },       // ex : "8H30", "14H30"
  lieu: { type: String, required: true },
  partie: { type: Number },        // ex : 1,2,3,4 … (Partie 1, Partie 2…)
  journeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Journee" },
});

export default mongoose.model("Rencontre", rencontre);