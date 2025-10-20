import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
    nom: {
      type: String,
      default: 'string division'
    }
}, { timestamps: true });

export default mongoose.model('Competition', competitionSchema);
