import Club from "../models/club.model.js";

export const createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du club", error });
  }
};

export const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate("equipes");
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des clubs", error });
  }
};

export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate("equipes");
    if (!club) return res.status(404).json({ message: "Club non trouvé" });
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const updateClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!club) return res.status(404).json({ message: "Club non trouvé" });
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du club", error });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: "Club non trouvé" });
    res.status(200).json({ message: "Club supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du club", error });
  }
};
