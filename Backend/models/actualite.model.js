import mongoose from 'mongoose';

const actualiteSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      trim: true,
    },
    contenu: {
      type: String,
      required: [true, 'Le contenu est obligatoire'],
      trim: true,
    },

    // 🔗 Relation 1️⃣-N️⃣ : une actualité peut avoir plusieurs images
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image', // doit correspondre au modèle d'image
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Actualite', actualiteSchema);
