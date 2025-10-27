import mongoose from "mongoose";


const classementSchema = new mongoose.Schema({
  equipe: String,
  joues: Number,
  gagnes: Number,
  nuls: Number,
  perdus: Number,
  points: Number,
  diff: Number,
});

const championnatSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  saison: { type: String, required: true },
  categorie: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  journees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journee",
    },
  ],
  classement: [classementSchema],
});

export default mongoose.model("Championnat", championnatSchema);
