import Commentaire from "../models/commentaire.model.js";
import Actualite from "../models/actualite.model.js";
import User from "../models/user.model.js";

/**
 * ➕ Créer un commentaire
 */
export const createCommentaire = async (req, res) => {
  try {
    const { contenu, actualiteId, auteurId } = req.body;

    // Vérification des champs obligatoires
    if (!contenu || !actualiteId || !auteurId) {
      return res.status(400).json({ message: "Contenu, actualité et auteur sont requis." });
    }

    // Vérifie que l’actualité existe
    const actualite = await Actualite.findById(actualiteId);
    if (!actualite) {
      return res.status(404).json({ message: "Actualité non trouvée." });
    }

    // Vérifie que l’auteur existe
    const auteur = await User.findById(auteurId);
    if (!auteur) {
      return res.status(404).json({ message: "Auteur non trouvé." });
    }

    // Création du commentaire
    const commentaire = await Commentaire.create({
      contenu,
      actualite: actualiteId,
      auteur: auteurId,
    });

    res.status(201).json(commentaire);
  } catch (error) {
    console.error("Erreur création commentaire :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * 📜 Récupérer tous les commentaires (avec auteur et actualité)
 */
export const getAllCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.find()
      .populate("auteur", "nom email") // affiche seulement nom et email de l’auteur
      .populate("actualite", "titre"); // affiche seulement le titre de l’actu
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};

/**
 * 🔍 Récupérer les commentaires d'une actualité
 */
export const getCommentairesByActualite = async (req, res) => {
  try {
    const { actualiteId } = req.params;

    const commentaires = await Commentaire.find({ actualite: actualiteId })
      .populate("auteur", "nom email")
      .sort({ createdAt: -1 }); // plus récents d’abord

    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du chargement des commentaires", error });
  }
};

/**
 * ✏️ Mettre à jour un commentaire
 */
export const updateCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenu } = req.body;

    const commentaire = await Commentaire.findByIdAndUpdate(
      id,
      { contenu },
      { new: true, runValidators: true }
    );

    if (!commentaire) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.status(200).json(commentaire);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error });
  }
};

/**
 * 🗑️ Supprimer un commentaire
 */
export const deleteCommentaire = async (req, res) => {
  try {
    const { id } = req.params;

    const commentaire = await Commentaire.findByIdAndDelete(id);

    if (!commentaire) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};
