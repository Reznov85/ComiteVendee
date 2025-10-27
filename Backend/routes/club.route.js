import express from "express";
import multer from "multer";
import {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/club.controller.js";

const router = express.Router();

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
    // Multer parse les champs texte en string → on reconvertit
    if (req.body.codePostal) req.body.codePostal = Number(req.body.codePostal);
    if (req.body.dateAffiliation) {
      const date = new Date(req.body.dateAffiliation);
      if (!isNaN(date)) req.body.dateAffiliation = date;
    }
    next();
  } catch (error) {
    console.error("Erreur normalisation body :", error);
    next();
  }
}

/* ============================================================
   🛠️ Routes CRUD Clubs
   ============================================================ */
router.post("/new", upload.single("logo"), normalizeBody, createClub);
router.get("/all", getAllClubs);
router.get("/:id", getClubById);
router.put("/:id", upload.single("logo"), normalizeBody, updateClub);
router.delete("/:id", deleteClub);

export default router;
