import express from "express";
import {
  getAllChampionnats,
  getAllJournees,
  getChampionnatById,
  createChampionnat,
  updateChampionnat,
  addJournee,
  getJourneesByChampionnat,
  getJourneeById,
  findJourneeById,
  deleteJournee,
} from "../controllers/championnat.controller.js";
import { getClassement } from "../controllers/classement.controller.js";
import Journee from "../models/journee.model.js";

const championnatRoute = express.Router();

championnatRoute.get("/all", getAllChampionnats);
championnatRoute.get("/journees/all", getAllJournees);
championnatRoute.get("/journee/:id", findJourneeById);
championnatRoute.get("/:id/journees", getJourneesByChampionnat);
championnatRoute.get("/:championnatId/journees/:journeeId", getJourneeById);
championnatRoute.get("/:id", getChampionnatById);
championnatRoute.post("/create", createChampionnat);
championnatRoute.put("/update/:id", updateChampionnat);
championnatRoute.post("/:id/add-journee", addJournee);
championnatRoute.get("/:id/classement", getClassement);
championnatRoute.delete('/journee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Supprimer la journée de la base de données
    const journee = await Journee.findByIdAndDelete(id);
    
    if (!journee) {
      return res.status(404).json({ message: 'Journée non trouvée' });
    }
    
    res.json({ message: 'Journée supprimée avec succès', journee });
  } catch (error) {
    console.error('Erreur suppression journée:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
});

export default championnatRoute;
