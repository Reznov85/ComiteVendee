import Actualite from "../models/actualite.model.js";
import Image from "../models/image.model.js";

/**
 * 🆕 Créer une actualité avec images uploadées
 */
export const createActualite = async (req, res) => {
  try {
    const { titre, contenu } = req.body;
    const uploadedFiles = req.files || [];

    // 🔗 Sauvegarde des images dans la collection Image
    const savedImages = await Promise.all(
      uploadedFiles.map(async (file) => {
        const image = new Image({
          url: `/uploads/${file.filename}`,
          description: file.originalname,
        });
        return await image.save();
      })
    );

    const actualite = new Actualite({
      titre,
      contenu,
      images: savedImages.map((img) => img._id),
    });

    const savedActualite = await actualite.save();
    const populatedActualite = await savedActualite.populate("images");

    res.status(201).json(populatedActualite);
  } catch (error) {
    console.error("❌ Erreur création actualité :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * 📜 Récupérer toutes les actualités avec leurs images
 */
export const getAllActualites = async (req, res) => {
  try {
    const actualites = await Actualite.find()
      .populate("images")
      .sort({ createdAt: -1 }); // du + récent au + ancien

    res.status(200).json(actualites);
  } catch (error) {
    console.error("❌ Erreur récupération actualités :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * 🔍 Récupérer une actualité par ID
 */
export const getActualiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const actualite = await Actualite.findById(id).populate("images");

    if (!actualite)
      return res.status(404).json({ message: "Actualité non trouvée" });

    res.status(200).json(actualite);
  } catch (error) {
    console.error("❌ Erreur récupération actualité :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * ✏️ Mettre à jour une actualité
 */
export const updateActualite = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, contenu } = req.body;
    const uploadedFiles = req.files || [];

    // ➕ Ajout de nouvelles images si uploadées
    const newImages = await Promise.all(
      uploadedFiles.map(async (file) => {
        const image = new Image({
          url: `/uploads/${file.filename}`,
          description: file.originalname,
        });
        return await image.save();
      })
    );

    const updatedActualite = await Actualite.findByIdAndUpdate(
      id,
      {
        titre,
        contenu,
        $push: { images: { $each: newImages.map((img) => img._id) } },
      },
      { new: true }
    ).populate("images");

    if (!updatedActualite)
      return res.status(404).json({ message: "Actualité non trouvée" });

    res.status(200).json(updatedActualite);
  } catch (error) {
    console.error("❌ Erreur mise à jour actualité :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * 🗑️ Supprimer une actualité + ses images associées
 */
export const deleteActualite = async (req, res) => {
  try {
    const { id } = req.params;
    const actualite = await Actualite.findById(id);

    if (!actualite)
      return res.status(404).json({ message: "Actualité non trouvée" });

    // Supprime les images associées
    await Image.deleteMany({ _id: { $in: actualite.images } });

    // Supprime l’actualité
    await actualite.deleteOne();

    res.status(200).json({ message: "Actualité supprimée avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression actualité :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
