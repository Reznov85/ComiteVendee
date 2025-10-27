
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "⛔ Accès réservé aux administrateurs" });
  }

  next();
};
