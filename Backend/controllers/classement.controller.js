import Championnat from "../models/championnat.model.js";

/**
 * 🧠 Calculer le classement d'un championnat
 * 
 * Cette fonction analyse toutes les rencontres de toutes les journées
 * d'un championnat pour calculer le classement des équipes.
 * 
 * @param {String} championnatId - L'ID du championnat
 * @returns {Array} - Le tableau du classement trié par points puis différence de buts
 */
export const calculerClassement = async (championnatId) => {
  try {
    console.log("📊 Début calcul du classement pour championnat :", championnatId);

    // 1️⃣ Récupère le championnat avec toutes ses journées et rencontres
    // .populate() permet de charger les documents liés (journées et rencontres)
    const championnat = await Championnat.findById(championnatId)
      .populate({
        path: "journees",
        populate: { path: "rencontres" },
      });

    // Vérification : le championnat existe-t-il ?
    if (!championnat) {
      console.error("❌ Championnat introuvable !");
      throw new Error("Championnat introuvable");
    }

    // Vérification : y a-t-il des journées ?
    if (!championnat.journees || championnat.journees.length === 0) {
      console.warn("⚠️ Aucune journée trouvée pour ce championnat !");
      championnat.classement = [];
      await championnat.save();
      return [];
    }

    // 2️⃣ Initialise une Map pour stocker les statistiques de chaque équipe
    // Map permet un accès rapide par nom d'équipe
    const stats = new Map();

    // 3️⃣ Parcourt chaque journée du championnat
    championnat.journees.forEach((journee) => {
      console.log(`📅 Traitement journée ${journee.numero} (${journee._id})`);

      // Vérification : y a-t-il des rencontres dans cette journée ?
      if (!journee.rencontres || journee.rencontres.length === 0) {
        console.warn("  ⚠️ Aucune rencontre dans cette journée");
        return; // Passe à la journée suivante
      }

      // 4️⃣ Parcourt chaque rencontre de la journée
      journee.rencontres.forEach((r) => {
        // Vérification : la rencontre existe ?
        if (!r) return console.warn("  ⚠️ Rencontre non trouvée");
        
        // Ignore les rencontres sans score (match pas encore joué)
        if (r.scoreA == null || r.scoreB == null) {
          console.log(
            `  ⏸️ Rencontre sans score (${r.equipeA} vs ${r.equipeB}) — ignorée`
          );
          return;
        }

        console.log(
          `  🧮 ${r.equipeA} ${r.scoreA} - ${r.scoreB} ${r.equipeB}`
        );

        // 5️⃣ Initialise les stats pour chaque équipe si elles n'existent pas encore
        [r.equipeA, r.equipeB].forEach((eq) => {
          if (!stats.has(eq)) {
            stats.set(eq, {
              equipe: eq,           // Nom de l'équipe
              joues: 0,            // Matchs joués
              gagnes: 0,           // Victoires
              nuls: 0,             // Matchs nuls
              perdus: 0,           // Défaites
              points: 0,           // Points (3 pour victoire, 1 pour nul, 0 pour défaite)
              diff: 0,             // Différence de buts (buts marqués - buts encaissés)
            });
          }
        });

        // 6️⃣ Récupère les stats des deux équipes
        const A = stats.get(r.equipeA);
        const B = stats.get(r.equipeB);

        // Incrémente le nombre de matchs joués pour les deux équipes
        A.joues++;
        B.joues++;

        // 7️⃣ Calcule et met à jour la différence de buts
        const diff = r.scoreA - r.scoreB;
        A.diff += diff;   // Équipe A : +diff
        B.diff -= diff;   // Équipe B : -diff

        // 8️⃣ Détermine le résultat et attribue les points
        if (r.scoreA > r.scoreB) {
          // Victoire de l'équipe A
          A.gagnes++;
          A.points += 3;  // 3 points pour la victoire
          B.perdus++;
        } else if (r.scoreA < r.scoreB) {
          // Victoire de l'équipe B
          B.gagnes++;
          B.points += 3;  // 3 points pour la victoire
          A.perdus++;
        } else {
          // Match nul
          A.nuls++;
          B.nuls++;
          A.points++;     // 1 point pour chaque équipe
          B.points++;
        }
      });
    });

    // 9️⃣ Convertit la Map en tableau et trie le classement
    const classement = [...stats.values()].sort((a, b) => {
      // Trie d'abord par points (décroissant)
      if (b.points !== a.points) return b.points - a.points;
      // En cas d'égalité de points, trie par différence de buts (décroissant)
      return b.diff - a.diff;
    });

    console.log("✅ Classement final calculé :", classement);

    // 🔟 Sauvegarde le classement dans le document championnat
    await Championnat.findByIdAndUpdate(
      championnatId,
      { classement },
      { new: true, runValidators: false }
    );

    console.log("💾 Classement sauvegardé dans le championnat !");
    return classement;
  } catch (error) {
    console.error("🔥 Erreur dans calculerClassement :", error);
    throw error;
  }
};

/**
 * 📦 Endpoint GET /championnat/:id/classement
 * 
 * Route pour récupérer le classement d'un championnat
 * Calcule automatiquement le classement à jour et le retourne
 */
export const getClassement = async (req, res) => {
  try {
    // Calcule le classement du championnat demandé
    const classement = await calculerClassement(req.params.id);
    
    // Retourne le classement au format JSON
    res.status(200).json(classement);
  } catch (error) {
    // En cas d'erreur, retourne un message d'erreur
    res.status(500).json({
      message: "Erreur calcul classement",
      error: error.message,
    });
  }
};
