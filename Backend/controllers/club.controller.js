
import Club from "../models/club.model.js";
import clubValidation from "../validations/club.validation.js";
import fs from "fs";


export const createClub = async (req, res) => {
  try {
    console.log("📩 Body reçu :", req.body);

    // ✅ Validation Joi
    const { clubCreate } = clubValidation(req.body);
    if (clubCreate.error) {
      const messages = clubCreate.error.details.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }

    // ✅ Gestion du logo
    const logoPath = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ Création du club
    const newClub = new Club({
      nom: req.body.nom,
      adresse: req.body.adresse,
      codePostal: req.body.codePostal,
      ville: req.body.ville,
      email: req.body.email,
      dateAffiliation: req.body.dateAffiliation,
      logo: logoPath,
    });

    const saved = await newClub.save();
    res.status(201).json({ message: "✅ Club créé avec succès !", club: saved });
  } catch (error) {
    console.error("❌ Erreur création club :", error);

    // Nettoyage si erreur
    if (req.file && fs.existsSync(`uploads/${req.file.filename}`)) {
      fs.unlinkSync(`uploads/${req.file.filename}`);
    }

    res.status(500).json({ message: "❌ Erreur serveur.", error: error.message });
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
   return res.status(200).json(club);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔎 Vérifie si le club existe
    const existingClub = await Club.findById(id);
    if (!existingClub) {
      if (req.file && fs.existsSync(`./uploads/${req.file.filename}`)) {
        fs.unlinkSync(`./uploads/${req.file.filename}`);
      }
      return res.status(404).json({ message: "Club non trouvé" });
    }

    // 🧾 Copie le corps de la requête
    const body = { ...req.body };

    // 📸 Si un nouveau logo est envoyé
    if (req.file) {
      body.logo = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // ✅ Validation des données
    const { error } = clubValidation(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // 💾 Mise à jour du club
    const updatedClub = await Club.findByIdAndUpdate(id, body, { new: true });

    if (!updatedClub) {
      return res.status(404).json({ message: "Le club n'existe pas" });
    }

    return res.status(200).json(updatedClub);

  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du club :", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour du club",
      error: error.message, // ✅ utile pour afficher l’erreur dans Insomnia
    });
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
