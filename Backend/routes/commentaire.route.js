import { Router } from "express";
import {
  createCommentaire,
  getAllCommentaires,
  getCommentairesByActualite,
  deleteCommentaire,
  
} from "../controllers/commentaire.controller.js";

const commentaireRoute = Router();

// ➕ Créer un commentaire
commentaireRoute.post("/", createCommentaire);

// 📜 Tous les commentaires
commentaireRoute.get("/", getAllCommentaires);

// 🔍 Commentaires d’une actualité
commentaireRoute.get("/actualite/:actualiteId", getCommentairesByActualite);

// 🗑️ Supprimer un commentaire
commentaireRoute.delete("/:id", deleteCommentaire);



export default commentaireRoute;
