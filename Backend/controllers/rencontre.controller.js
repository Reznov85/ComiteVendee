import Rencontre from "../models/rencontre.model.js";
import Journee from "../models/journee.model.js";
import { calculerClassement } from "./classement.controller.js";

/* ============================================================
   🎯 CONTROLLERS RENCONTRE
   ============================================================ */

/**
 * ➕ Créer une nouvelle rencontre
 * POST /rencontre/create
 */
export const createRencontre = async (req, res) => {
  try {
    const rencontre = new Rencontre(req.body);
    const saved = await rencontre.save();

    // 🔗 Lier la rencontre à la journée
    const updatedJournee = await Journee.findById(req.body.journeeId);
    if (updatedJournee) {
      updatedJournee.rencontres.push(saved._id);
      await updatedJournee.save();
    }

    res.status(201).json(saved);
  } catch (error) {
    console.error("Erreur création rencontre :", error);
    res.status(500).json({ message: "Erreur lors de la création", error });
  }
};


/**
 * 📋 Obtenir toutes les rencontres
 * GET /rencontre/all
 */
export const getAllRencontres = async (req, res) => {
  try {
    const rencontres = await Rencontre.find().populate("journeeId");
    res.status(200).json(rencontres);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération", error });
  }
};

export const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { scoreA, scoreB } = req.body;

    const rencontre = await Rencontre.findByIdAndUpdate(
      id,
      { scoreA, scoreB },
      { new: true }
    );

    if (!rencontre)
      return res.status(404).json({ message: "Rencontre non trouvée" });

    res.status(200).json({
      message: "Score mis à jour avec succès",
      rencontre,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur maj score", error });
  }
};

/**
 * 🔍 Obtenir une rencontre par ID
 * GET /rencontre/:id
 */
export const getRencontreById = async (req, res) => {
  try {
    const rencontre = await Rencontre.findById(req.params.id).populate("journeeId");
    if (!rencontre) return res.status(404).json({ message: "Rencontre non trouvée" });
    res.status(200).json(rencontre);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération", error });
  }
};

/**
 * 📅 Obtenir les rencontres d'une journée
 * GET /rencontre/by-journee/:journeeId
 */
export const getRencontresByJournee = async (req, res) => {
  try {
    const rencontres = await Rencontre.find({ journeeId: req.params.journeeId });
    res.status(200).json(rencontres);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération par journée", error });
  }
};

/**
 * ✏️ Mettre à jour une rencontre
 * PUT /rencontre/update/:id
 */
export const updateRencontre = async (req, res) => {
  try {
    // 🔄 Mise à jour du score ou autres infos
    const updated = await Rencontre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Rencontre non trouvée" });

    // 🧩 Trouver la journée correspondante
    const journee = await Journee.findOne({ rencontres: updated._id });

    // 🏆 Recalculer le classement du championnat concerné
    if (journee) {
      await calculerClassement(journee.championnat);
      console.log(`✅ Classement mis à jour pour le championnat ${journee.championnat}`);
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Erreur mise à jour rencontre :", error);
    res.status(500).json({ message: "Erreur de mise à jour", error });
  }
};

/**
 * ❌ Supprimer une rencontre
 * DELETE /rencontre/delete/:id
 */
export const deleteRencontre = async (req, res) => {
  try {
    const deleted = await Rencontre.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Rencontre non trouvée" });

    res.status(200).json({ message: "Rencontre supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur de suppression", error });
  }
};
