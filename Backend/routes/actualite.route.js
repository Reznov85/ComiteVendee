import express from "express";
import upload from "../middlewares/upload.js"; // ✅ middleware centralisé
import {
  createActualite,
  getAllActualites,
  getActualiteById,
  updateActualite,
  deleteActualite,
} from "../controllers/actualite.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const actualiteRoute = express.Router();

/* ============================================================
   📰 Routes CRUD Actualités avec upload d’images multiples
   ============================================================ */

// 🆕 Créer une actualité (avec plusieurs images)
actualiteRoute.post("/create", auth, isAdmin, upload.array("images", 10), createActualite);

// 📋 Récupérer toutes les actualités
actualiteRoute.get("/all", getAllActualites);

// 🔍 Récupérer une actualité par ID
actualiteRoute.get("/:id", getActualiteById);

// ✏️ Mettre à jour une actualité (avec possibilité d’ajouter des images)
actualiteRoute.put("/update/:id", upload.array("images", 10), updateActualite);

// ❌ Supprimer une actualité
actualiteRoute.delete("/delete/:id", deleteActualite);

export default actualiteRoute;
