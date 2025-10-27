// =======================================
// 🧩 CONTROLLER : Equipe
// =======================================

import Equipe from "../models/equipe.model.js";
import Club from "../models/club.model.js";

// =======================================
// ➕ Créer une nouvelle équipe
// =======================================
export const createEquipe = async (req, res) => {
  try {
    const { nom, categorie, division, clubId, competitionId } = req.body;

    // Vérifie les champs obligatoires
    if (!nom || !categorie || !clubId || !competitionId) {
      return res.status(400).json({ message: "Nom, catégorie, clubId et competitionId sont requis" });
    }

    // Vérifie l'existence du club
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club non trouvé" });

    // Vérifie l'existence de la compétition
    const competition = await Competition.findById(competitionId);
    if (!competition) return res.status(404).json({ message: "Compétition non trouvée" });

    // Crée l’équipe
    const equipe = await Equipe.create({
      nom,
      categorie,
      division,
      club: club._id,
      competition: competition._id,
    });

    // Ajoute l’équipe dans les références du club et de la compétition
    club.equipes.push(equipe._id);
    await club.save();

    competition.equipes.push(equipe._id);
    await competition.save();

    res.status(201).json(equipe);
  } catch (error) {
    console.error("❌ Erreur création équipe :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'équipe", error });
  }
};

// =======================================
// 📜 Récupérer toutes les équipes
// =======================================
export const getAllEquipes = async (req, res) => {
  try {
    const equipes = await Equipe.find()
      .populate("club", "nom ville")
      .populate("competition", "nom categorie division");

    res.status(200).json(equipes);
  } catch (error) {
    console.error("❌ Erreur récupération équipes :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des équipes", error });
  }
};

// =======================================
// 🔍 Récupérer une équipe par ID
// =======================================
export const getEquipeById = async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id)
      .populate("club", "nom ville")
      .populate("competition", "nom categorie division");

    if (!equipe) return res.status(404).json({ message: "Équipe non trouvée" });

    res.status(200).json(equipe);
  } catch (error) {
    console.error("❌ Erreur récupération équipe :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// =======================================
// ✏️ Mettre à jour une équipe
// =======================================
export const updateEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!equipe) return res.status(404).json({ message: "Équipe non trouvée" });

    res.status(200).json(equipe);
  } catch (error) {
    console.error("❌ Erreur mise à jour équipe :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'équipe", error });
  }
};

// =======================================
// ❌ Supprimer une équipe
// =======================================
export const deleteEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id);
    if (!equipe) return res.status(404).json({ message: "Équipe non trouvée" });

    // Retire l’équipe du club et de la compétition
    await Club.findByIdAndUpdate(equipe.club, { $pull: { equipes: equipe._id } });
    await Competition.findByIdAndUpdate(equipe.competition, { $pull: { equipes: equipe._id } });

    // Supprime l’équipe
    await equipe.deleteOne();

    res.status(200).json({ message: "Équipe supprimée avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression équipe :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'équipe", error });
  }
};
