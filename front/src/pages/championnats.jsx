import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "flowbite";

/**
 * 🏆 Page : Liste de tous les championnats
 * ----------------------------------------
 * Affiche sous forme de cartes les championnats enregistrés.
 * Chaque carte permet d'accéder à la page détaillée.
 */
const Championnats = () => {
  const [championnats, setChampionnats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  /* ------------------------------------------------------------
     🔄 Chargement des championnats
     ------------------------------------------------------------ */
 useEffect(() => {
  api.get("/championnat/all", { withCredentials: false })
    .then((res) => {
      setChampionnats(res.data || []);
      setLoaded(true);
    })
    .catch((err) => {
      console.error("❌ Erreur Axios :", err);
      setError("Erreur de chargement des championnats");
      setLoaded(true);
    });
}, []);


  /* ------------------------------------------------------------
     🧾 États d'affichage
     ------------------------------------------------------------ */
  if (!loaded)
    return (
      <div className="text-center mt-10 text-gray-500">Chargement...</div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {error}
      </div>
    );

  if (!championnats.length)
    return (
      <div className="text-center mt-10 text-gray-500">
        Aucun championnat trouvé.
      </div>
    );

  /* ------------------------------------------------------------
     🎨 Affichage de la liste
     ------------------------------------------------------------ */
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* 🏷️ Titre principal */}
      <h1 className="text-3xl font-bold text-center text-cyan-700 mb-8 drop-shadow">
        🏆 Liste des Championnats
      </h1>

      {/* 🧱 Grille responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {championnats.map((champ) => (
          <div
            key={champ._id}
            className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {/* 📅 En-tête visuel */}
            <div className="bg-gradient-to-r from-cyan-700 to-sky-600 p-4 text-white">
              <h2 className="text-lg font-semibold">{champ.nom}</h2>
              <p className="text-sm text-cyan-100">
                Saison {champ.saison || "?"}{" "}
                {champ.categorie ? `• ${champ.categorie}` : ""}
              </p>
            </div>

            {/* 📋 Détails */}
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-2">
                📅{" "}
                {champ.dateDebut
                  ? new Date(champ.dateDebut).toLocaleDateString("fr-FR")
                  : "Date inconnue"}{" "}
                ➜{" "}
                {champ.dateFin
                  ? new Date(champ.dateFin).toLocaleDateString("fr-FR")
                  : "?"}
              </p>

              <p className="text-gray-600 text-sm">
                🕹️ {champ.journees?.length || 0} journée(s)
              </p>

              {/* 🔗 Bouton d’accès */}
              <div className="mt-4">
                <Link
                  to={`/championnat/${champ._id}`}
                  className="inline-block w-full text-center bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-700 transition"
                >
                  Voir le championnat
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Championnats;
