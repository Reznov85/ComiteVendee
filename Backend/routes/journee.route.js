import express from "express";
import {
  getAllJournees,
  getJourneeById,
  createJournee,
  deleteJournee
} from "../controllers/journee.controller.js";

const journeeRoute = express.Router();

journeeRoute.get("/all", getAllJournees);
journeeRoute.get("/:id", getJourneeById);
journeeRoute.post("/create", createJournee);
// Route pour supprimer une journée
journeeRoute.delete('/:id', deleteJournee);


export default journeeRoute;
