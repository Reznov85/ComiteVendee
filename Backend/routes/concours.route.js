import express from "express";
import multer from "multer";
import { createConcours, getAllConcours, getConcoursById } from "../controllers/concours.controller.js";

const concoursRoute = express.Router();

// 📂 Configuration Multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ➕ Créer un concours avec image
concoursRoute.post("/new", upload.single("affiche"), createConcours);

// 📜 Tous les concours
concoursRoute.get("/all", getAllConcours);

concoursRoute.get("/:id", getConcoursById)



export default concoursRoute;
