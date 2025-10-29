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
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* ------------------------------------------------------------
     🔐 Vérification du rôle utilisateur
     ------------------------------------------------------------ */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        setUserRole(decodedPayload.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erreur décodage JWT :", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  /* ------------------------------------------------------------
     🔄 Chargement des championnats
     ------------------------------------------------------------ */
 useEffect(() => {
  api.get("/championnat/all", { withCredentials: false })
    .then((res) => {
      setChampionnats(res.data || []);
      setLoaded(true);
      // Nettoyer le flag de mise à jour après rechargement
      localStorage.removeItem("championnatsNeedUpdate");
    })
    .catch((err) => {
      console.error("❌ Erreur Axios :", err);
      setError("Erreur de chargement des championnats");
      setLoaded(true);
    });
}, []);

  /* ------------------------------------------------------------
     🔄 Recharger si une mise à jour est nécessaire
     ------------------------------------------------------------ */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && localStorage.getItem("championnatsNeedUpdate") === "true") {
        // Recharger les championnats quand on revient sur la page
        api.get("/championnat/all", { withCredentials: false })
          .then((res) => {
            setChampionnats(res.data || []);
            localStorage.removeItem("championnatsNeedUpdate");
            console.log("✅ Liste des championnats mise à jour");
          })
          .catch((err) => {
            console.error("❌ Erreur lors de la mise à jour :", err);
          });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Vérifier aussi au montage du composant
    if (localStorage.getItem("championnatsNeedUpdate") === "true") {
      handleVisibilityChange();
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-700 drop-shadow">
          🏆 Liste des Championnats
        </h1>
        {/* 🔒 Bouton visible UNIQUEMENT pour les admins connectés */}
        {isAuthenticated && userRole === "admin" && (
          <Link
            to="/championnats/new"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            ➕ Ajouter un championnat
          </Link>
        )}
      </div>

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
