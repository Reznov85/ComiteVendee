import express from "express";
import {
  getAllJournees,
  getJourneeById,
  createJournee,
} from "../controllers/journee.controller.js";

const journeeRoute = express.Router();

journeeRoute.get("/all", getAllJournees);
journeeRoute.get("/:id", getJourneeById);
journeeRoute.post("/create", createJournee);

export default journeeRoute;
