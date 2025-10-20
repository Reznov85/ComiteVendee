import mongoose from "mongoose";

const commentaireSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
    },
    contenu: {
      type: String,
      required: [true, "Le contenu du commentaire est obligatoire"],
      trim: true,
    },
    // 🔗 Relation avec une actualité (1️⃣-N️⃣)
    actualite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actualite",
      required: [true, "Le commentaire doit être lié à une actualité"],
    },
    // 🔗 (optionnel) Relation avec un utilisateur si tu as un système d’auth
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ou "Utilisateur" selon ton modèle
      required: true,
    },
 
  },
  { timestamps: true }
);

export default mongoose.model("Commentaire", commentaireSchema);
