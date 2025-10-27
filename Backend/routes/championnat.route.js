import express from "express";
import {
  getAllChampionnats,
  getAllJournees,
  getChampionnatById,
  createChampionnat,
  addJournee,
  getJourneesByChampionnat,
  getJourneeById,
  findJourneeById,
} from "../controllers/championnat.controller.js";
import { getClassement } from "../controllers/classement.controller.js";

const championnatRoute = express.Router();

championnatRoute.get("/all", getAllChampionnats);
championnatRoute.get("/journees/all", getAllJournees);
championnatRoute.get("/journee/:id", findJourneeById);
championnatRoute.get("/:id/journees", getJourneesByChampionnat);
championnatRoute.get("/:championnatId/journees/:journeeId", getJourneeById);
championnatRoute.get("/:id", getChampionnatById);
championnatRoute.post("/create", createChampionnat);
championnatRoute.post("/:id/add-journee", addJournee);
championnatRoute.get("/:id/classement", getClassement);

export default championnatRoute;
