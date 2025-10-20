import Image from "../models/image.model.js";

/**
 * ➕ Upload d'une ou plusieurs images
 */
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Aucun fichier envoyé." });
    }

    const images = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      description: file.originalname,
    }));

    const savedImages = await Image.insertMany(images);
    res.status(201).json(savedImages);
  } catch (error) {
    console.error("Erreur upload image :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * 📜 Récupérer toutes les images
 */
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
