const classementSchema = new mongoose.Schema({
  equipe: { type: mongoose.Schema.Types.ObjectId, ref: "Equipe", required: true },
  joues: { type: Number, default: 0 },
  gagnes: { type: Number, default: 0 },
  nuls: { type: Number, default: 0 },
  perdus: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  diff: { type: Number, default: 0 },
});

const championnatSchema = new mongoose.Schema({
  nom: String,
  saison: String,
  journees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Journee" }],
  classement: [classementSchema], // ← ici
});
export default mongoose.model("Championnat", championnatSchema);