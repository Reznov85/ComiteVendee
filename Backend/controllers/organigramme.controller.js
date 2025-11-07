// controllers/organigrammeController.js
import utilisateur from "../models/user.model.js";


export const getOrganigramme = async (req, res) => {
  try {
    const users = await utilisateur.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé." });
    }

    // Retourner tous les utilisateurs
    res.json(users);
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur lors du chargement de l'organigramme." });
  }
};
