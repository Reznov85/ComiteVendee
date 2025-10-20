import multer from "multer";
import path from "path";
import fs from "fs";

// 📁 Dossier de destination
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 🧰 Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, fileName);
  },
});

// 🔍 Filtre (optionnel) pour n'accepter que les images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers image sont autorisés !"), false);
  }
};

export const upload = multer({ storage, fileFilter });
