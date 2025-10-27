import Journee from "../models/journee.model.js";
import Championnat from "../models/championnat.model.js";

/* ------------------------------------------------------------
   📅 Obtenir toutes les journées
------------------------------------------------------------ */
export const getAllJournees = async (req, res) => {
  try {
    const journees = await Journee.find().populate("championnat").populate("rencontres");
    res.status(200).json(journees);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   📅 Obtenir une journée par ID
------------------------------------------------------------ */
export const getJourneeById = async (req, res) => {
  try {
    const journee = await Journee.findById(req.params.id)
      .populate("championnat")
      .populate("rencontres");
    if (!journee) return res.status(404).json({ message: "Journée non trouvée" });
    res.status(200).json(journee);
  } catch (error) {
    console.error("Erreur lors de la récupération de la journée :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   ➕ Créer une journée
------------------------------------------------------------ */
export const createJournee = async (req, res) => {
  try {
    const { numero, date, lieu, championnat } = req.body;
    const newJournee = new Journee({ numero, date, lieu, championnat });
    const saved = await newJournee.save();

    const updatedChampionnat = await Championnat.findById(championnat);
    updatedChampionnat.journees.push(saved._id);
    await updatedChampionnat.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création", error });
  }
};
