import Utilisateur from "../models/user.model.js";

export const getOrganigramme = async (req, res) => {
  try {
    const users = await Utilisateur.find()
      .populate("reportsTo", "nom prenom fonction photo")
      .lean();

    // Créer une structure hiérarchique
    const map = {};
    const roots = [];

    users.forEach(u => { map[u._id] = { ...u, subordinates: [] }; });

    users.forEach(u => {
      if (u.reportsTo) {
        map[u.reportsTo._id].subordinates.push(map[u._id]);
      } else {
        roots.push(map[u._id]);
      }
    });

    res.json(roots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
