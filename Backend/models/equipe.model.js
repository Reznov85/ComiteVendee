import mongoose from "mongoose";

const equipeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom de l'équipe est obligatoire"],
      trim: true,
    },
   
    // 🔗 Relation inverse N️⃣-1️⃣ : une équipe appartient à un club
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "L'équipe doit appartenir à un club"],
    },
   competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Competition"
  }
  },
  { timestamps: true }
);


export default mongoose.model("Equipe", equipeSchema);
