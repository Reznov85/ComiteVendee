import Championnat from "../models/championnat.model.js";

/* ------------------------------------------------------------
   🏆 Obtenir tous les championnats
------------------------------------------------------------ */
export const getAllChampionnats = async (req, res) => {
  try {
    const championnats = await Championnat.find().sort({ dateDebut: 1 });
    res.status(200).json(championnats);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   📅 Obtenir toutes les journées de tous les championnats
------------------------------------------------------------ */
export const getAllJournees = async (req, res) => {
  try {
    const championnats = await Championnat.find().sort({ dateDebut: 1 });
    
    // Récupère toutes les journées avec les infos du championnat
    const toutesLesJournees = [];
    
    championnats.forEach(championnat => {
      championnat.journees.forEach(journee => {
        toutesLesJournees.push({
          _id: journee._id,
          numero: journee.numero,
          date: journee.date,
          lieu: journee.lieu,
          championnat: {
            _id: championnat._id,
            nom: championnat.nom,
            saison: championnat.saison,
            categorie: championnat.categorie
          }
        });
      });
    });
    
    res.status(200).json(toutesLesJournees);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   🔍 Obtenir un championnat par ID
------------------------------------------------------------ */
export const getChampionnatById = async (req, res) => {
  try {
    const championnat = await Championnat.findById(req.params.id).populate("journees");
    
    if (!championnat) {
      return res.status(404).json({ message: "Championnat introuvable" });
    }
    
    res.status(200).json(championnat);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   🏆 Créer un championnat
------------------------------------------------------------ */
export const createChampionnat = async (req, res) => {
  try {
    const { nom, saison, categorie, dateDebut, dateFin } = req.body;

    const newChampionnat = new Championnat({
      nom,
      saison,
      categorie,
      dateDebut,
      dateFin,
      journees: [],
    });

    const saved = await newChampionnat.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création", error });
  }
};

/* ------------------------------------------------------------
   ✏️ Modifier un championnat
------------------------------------------------------------ */
export const updateChampionnat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, saison, categorie, dateDebut, dateFin } = req.body;

    // Vérifie que le championnat existe
    const championnat = await Championnat.findById(id);
    if (!championnat) {
      return res.status(404).json({ message: "Championnat introuvable" });
    }

    // Met à jour uniquement les champs fournis
    const updatedChampionnat = await Championnat.findByIdAndUpdate(
      id,
      { nom, saison, categorie, dateDebut, dateFin },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Championnat modifié avec succès",
      championnat: updatedChampionnat
    });
  } catch (error) {
    console.error("Erreur lors de la modification du championnat :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};



/* ------------------------------------------------------------
   🏁 Ajouter une journée à un championnat
------------------------------------------------------------ */
export const addJournee = async (req, res) => {
  try {
    const championnatId = req.params.id;

    // 🔍 Vérifie que le championnat existe
    const championnat = await Championnat.findById(championnatId);
    if (!championnat) {
      return res.status(404).json({ message: "Championnat introuvable" });
    }

    // 🆕 Crée un objet journée
    const nouvelleJournee = {
      numero: req.body.numero,
      date: req.body.date,
      lieu: req.body.lieu,
    };

    // 📥 Ajoute la journée dans le tableau embarqué
    championnat.journees.push(nouvelleJournee);

    // 💾 Sauvegarde du championnat
    await championnat.save();

    // ✅ Retourne la journée ajoutée (la dernière du tableau)
    res.status(201).json({
      message: "✅ Journée ajoutée avec succès au championnat",
      journee: championnat.journees[championnat.journees.length - 1],
    });
  } catch (error) {
    console.error("Erreur ajout journée :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   📅 Obtenir toutes les journées d'un championnat
------------------------------------------------------------ */
export const getJourneesByChampionnat = async (req, res) => {
  try {
    const championnat = await Championnat.findById(req.params.id);

    if (!championnat) {
      return res.status(404).json({ message: "Championnat introuvable" });
    }

    res.status(200).json(championnat.journees);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   🔍 Obtenir une journée spécifique d'un championnat
------------------------------------------------------------ */
export const getJourneeById = async (req, res) => {
  try {
    const { championnatId, journeeId } = req.params;

    const championnat = await Championnat.findById(championnatId);

    if (!championnat) {
      return res.status(404).json({ message: "Championnat introuvable" });
    }

    const journee = championnat.journees.id(journeeId);

    if (!journee) {
      return res.status(404).json({ message: "Journée introuvable" });
    }

    res.status(200).json(journee);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   🔎 Rechercher une journée par son ID (sans connaître le championnat)
------------------------------------------------------------ */
export const findJourneeById = async (req, res) => {
  try {
    const { journeeId } = req.params;

    // Recherche dans tous les championnats
    const championnats = await Championnat.find({ "journees._id": journeeId });

    if (championnats.length === 0) {
      return res.status(404).json({ message: "Journée introuvable" });
    }

    // Récupère le premier championnat contenant cette journée
    const championnat = championnats[0];
    const journee = championnat.journees.id(journeeId);

    res.status(200).json({
      championnat: {
        _id: championnat._id,
        nom: championnat.nom,
        saison: championnat.saison,
        categorie: championnat.categorie
      },
      journee: journee
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/* ------------------------------------------------------------
   🗑️ Supprimer une journée d'un championnat
------------------------------------------------------------ */
export const deleteJournee = async (req, res) => {
  try {
    const { championnatId, journeeId } = req.params;

    // Récupère le championnat
    const championnat = await Championnat.findById(championnatId);

    if (!championnat) {
      return res.status(404).json({ message: "Championnat introuvable" });
    }

    // Vérifie que la journée existe
    const journee = championnat.journees.id(journeeId);
    if (!journee) {
      return res.status(404).json({ message: "Journée introuvable" });
    }

    // Supprime la journée du tableau embarqué
    journee.deleteOne();

    // Sauvegarde le championnat
    await championnat.save();

    res.status(200).json({ 
      message: "Journée supprimée avec succès",
      championnat
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de la journée :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
