import Concours from "../models/concours.model.js";

// ➕ Créer un concours
export const createConcours = async (req, res) => {
  try {
    const { titre, date, lieu, club, type, categorie, description } = req.body;
    const affiche = req.file ? `/uploads/${req.file.filename}` : null;

    const concours = new Concours({
      titre,
      date,
      lieu,
      club,
      type,
      categorie,
      description,
      affiche,
    });

    const saved = await concours.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Erreur création concours :", error);
    res.status(500).json({ message: "Erreur création concours", error });
  }
};

// 📜 Tous les concours
export const getAllConcours = async (req, res) => {
  try {
    const concours = await Concours.find().sort({ date: 1 });
    res.status(200).json(concours);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération concours", error });
  }
};

export const getConcoursById = async (req, res) => {
  try {
    const concours = await Concours.findById(req.params.id);
    if (!concours) {
      return res.status(404).json({ message: "Concours introuvable" });
    }
    res.status(200).json(concours);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};
