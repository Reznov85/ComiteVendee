
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    nom: {
      type: String,
      required: true
    },
    prenom: {
      type: String,
      required: true
    },
    fonctionId: {
      type: String,
      required: false
    },
    fonction: {
      type: String,
      required: false
    },
   role: {
      type: String,
      enum: ["admin", "user", "comite"], // valeurs possibles
      default: "user",         // valeur par défaut
      required: true,
    },
    photo: {
      type: String,
      required: false
    },

     // Relation N️⃣-1️⃣ : un joueur appartient à un club
  club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },

  // 🔽 Nouveau champ pour hiérarchie organigramme :
  reportsTo: { type: String, default: null },

}, { timestamps: true });

userSchema.pre("save", async function(){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
  }
})

userSchema.pre("findOneAndUpdate", async function () {
  let update = this.getUpdate();

  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 10);

    this.setUpdate({
      ...update,
      password: hashed
    });
  }
})

export default mongoose.model('User', userSchema);
