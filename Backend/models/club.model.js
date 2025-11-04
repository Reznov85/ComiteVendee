import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom du club est obligatoire"],
      trim: true,
    },
    adresse: {
      type: String,
      required: true,
      trim: true,
    },
    adresseTerrain: {
      type: String,
      required: false,
      trim: true,
    },
    president: {
      type: String,
      required: false,
      trim: true,
    },
    telephone: {
      type: String,
      required: false,
      trim: true,
    },
    codePostal: {
      type: Number,
      required: false,
    },
    ville: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Format d'email invalide"],
    },
    dateAffiliation: {
      type: Date,
      required: false,
    },
    logo: {
      type: String,
      required: false,
      trim: true,
    },
    // 🔗 Relation 1️⃣-N️⃣ : un club possède plusieurs équipes
    equipes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Equipe" }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Club", clubSchema);
