import multer from "multer";
import path from "path";
import fs from "fs";

/* ============================================================
   📁 Dossier d'upload centralisé
   ============================================================ */
const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* ============================================================
   ⚙️ Configuration du stockage (nom unique + extension conservée)
   ============================================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const uniqueName = `${base}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

/* ============================================================
   🧠 Filtre de validation : seulement images
   ============================================================ */
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Seules les images JPG, PNG, WEBP sont autorisées"));
  }
};

/* ============================================================
   🚀 Exports multiples (selon usage)
   ============================================================ */

// 🔹 Upload d’un seul logo (PUT /club/:id)
export const uploadLogo = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// 🔹 Upload de plusieurs images (POST /actualite/new ou /galerie)
export const uploadImages = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// 🔹 Export par défaut générique (si tu veux juste “upload”)
export default multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
