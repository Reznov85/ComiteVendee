import mongoose from "mongoose";

const concoursSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    lieu: { type: String, required: true, trim: true },
    club: { type: String, trim: true },
    type: { type: String, enum: ["Doublette", "Triplette", "Tête-à-tête"], required: true },
    categorie: { type: String, enum: ["Senior", "Vétéran", "Jeune", "Féminin", "Promotion"], required: true },
    description: { type: String, trim: true },
    affiche: { type: String, trim: true }, // URL de l’affiche ou visuel
  },
  { timestamps: true }
);

export default mongoose.model("Concours", concoursSchema);
