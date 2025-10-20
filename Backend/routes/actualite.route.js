import express from "express";
import multer from "multer";
import {
  createActualite,
  getAllActualites,
  getActualiteById,
  updateActualite,
  deleteActualite,
} from "../controllers/actualite.controller.js";

const actualiteRoute = express.Router();

// 📁 Config Multer pour enregistrer les fichiers dans /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// ✅ Route avec upload multiple
actualiteRoute.post("/create", upload.array("images", 10), createActualite);
actualiteRoute.get("/all", getAllActualites);
actualiteRoute.get("/:id", getActualiteById);
actualiteRoute.put("/update/:id", upload.array("images", 10), updateActualite);
actualiteRoute.delete("/delete/:id", deleteActualite);

export default actualiteRoute;
