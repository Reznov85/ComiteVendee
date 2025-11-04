import express from "express";
import multer from "multer";
import {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
  createMultipleClubs,
} from "../controllers/club.controller.js";
import Club from "../models/club.model.js";

const clubRoute = express.Router();

/* ============================================================
   📸 Config Multer
   ============================================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

/* ============================================================
   🧩 Middleware de normalisation du body
   ============================================================ */
function normalizeBody(req, res, next) {
  try {
    console.log("🔧 Normalisation - Body avant :", req.body);
    
    // Multer parse les champs texte en string → on reconvertit
    if (req.body.codePostal) req.body.codePostal = Number(req.body.codePostal);
    
    if (req.body.dateAffiliation) {
      const dateStr = req.body.dateAffiliation.trim();
      if (dateStr === "" || dateStr === "null" || dateStr === "undefined") {
        req.body.dateAffiliation = null;
      } else {
        const date = new Date(dateStr);
        if (!isNaN(date)) {
          req.body.dateAffiliation = date;
        } else {
          req.body.dateAffiliation = null;
        }
      }
    }
    
    console.log("🔧 Normalisation - Body après :", req.body);
    next();
  } catch (error) {
    console.error("Erreur normalisation body :", error);
    next();
  }
}

/* ============================================================
   🛠️ Routes CRUD Clubs
   ============================================================ */
clubRoute.post("/new", upload.single("logo"), normalizeBody, createClub);
// Exemple route pour créer plusieurs clubs
clubRoute.post("/multiple", upload.array("logos"), normalizeBody, createMultipleClubs);


clubRoute.get("/all", getAllClubs);
clubRoute.get("/:id", getClubById);
clubRoute.put("/:id", upload.single("logo"), normalizeBody, updateClub);
clubRoute.delete("/:id", deleteClub);
// 🔍 Route de recherche des clubs
clubRoute.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";
    const clubs = await Club.find({
      nom: { $regex: q, $options: "i" },
    }).limit(20);
    res.json(clubs);
  } catch (err) {
    console.error("Erreur recherche clubs :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


export default clubRoute;
