import express from "express";
import { getOrganigramme } from "../controllers/organigramme.controller.js";

const organigrammeRoute = express.Router();

organigrammeRoute.get("/organigramme", getOrganigramme);

export default organigrammeRoute;
