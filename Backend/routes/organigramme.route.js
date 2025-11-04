import express from "express";
import { getOrganigramme } from "../controllers/organigramme.controller.js";

const organigrammeRoute = express.Router();

organigrammeRoute.get("/", getOrganigramme);

export default organigrammeRoute;
