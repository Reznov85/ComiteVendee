import express from "express";
import {
  createRencontre,
  getAllRencontres,
  getRencontreById,
  updateRencontre,
  deleteRencontre,
  updateScore,
} from "../controllers/rencontre.controller.js";

const rencontreRoute = express.Router();

rencontreRoute.get("/", (req, res) => {
  res.send("✅ Backend Rencontre actif !");
});

rencontreRoute.post("/create", createRencontre);
rencontreRoute.get("/all", getAllRencontres);
rencontreRoute.get("/:id", getRencontreById);
rencontreRoute.put("/update/:id", updateRencontre);
rencontreRoute.delete("/delete/:id", deleteRencontre);
router.put("/:id/score", updateScore);

export default rencontreRoute;
