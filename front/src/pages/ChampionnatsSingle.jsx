import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "flowbite";

const ChampionnatDetails = () => {
  const { id } = useParams();
  const [championnat, setChampionnat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * 🔐 VÉRIFICATION DU RÔLE UTILISATEUR
   * ===================================
   * Ce useEffect s'exécute UNE SEULE FOIS au montage du composant
   * Son rôle : Vérifier si l'utilisateur connecté est un admin
   * 
   * 🎯 POURQUOI ?
   * Pour afficher les boutons "Supprimer" UNIQUEMENT aux admins connectés
   */
  useEffect(() => {
    // 📦 Récupérer le token JWT depuis le localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // 🔍 Décoder le token JWT (format: header.payload.signature)
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        // 💾 Extraire et stocker le rôle de l'utilisateur
        setUserRole(decodedPayload.role);
        setIsAuthenticated(true);
        console.log("👤 Rôle utilisateur détecté:", decodedPayload.role);
      } catch (error) {
        console.error("Erreur décodage JWT :", error);
        setIsAuthenticated(false);
      }
    } else {
      console.log("⚠️ Aucun token trouvé - utilisateur non connecté");
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    api
      .get(`/championnat/${id}`)
      .then((res) => {
        setChampionnat(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  const handleDeleteJournee = async (journeeId, journeeNumero) => {

    try {
      console.log("📡 Appel API: DELETE /journee/" + journeeId);
      await api.delete(`/journee/${journeeId}`);
      
      console.log("✅ Journée supprimée avec succès");
      
      setChampionnat((prev) => ({
        ...prev,
        journees: prev.journees.filter((j) => j._id !== journeeId),
      }));
      
      // Signaler que la liste des championnats doit être mise à jour
      localStorage.setItem("championnatsNeedUpdate", "true");
      
      alert(`Journée ${journeeNumero} supprimée avec succès`);
    } catch (err) {
      console.error("❌ Erreur lors de la suppression:", err);
      console.error("📋 Détails de l'erreur:", err.response);
      
      if (err.response?.status === 404) {
        alert("❌ Erreur : La route API pour supprimer une journée n'existe pas (404). Vérifiez le backend.");
      } else {
        alert("Erreur lors de la suppression : " + (err.response?.data?.message || err.message));
      }
    }
  
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-cyan-600 rounded-full" />
        <span className="ml-3 text-gray-600 font-medium">
          Chargement du championnat...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        ❌ Erreur : {error}
      </div>
    );

  if (!championnat)
    return (
      <div className="text-center text-gray-500 mt-10">
        Aucun championnat trouvé
      </div>
    );

  // 📅 Séparer les journées selon leur statut (terminées, en cours, à venir)
  const aujourdhui = new Date();
  aujourdhui.setHours(0, 0, 0, 0);

  // ✅ Journées terminées (date < aujourd'hui)
  const journeesTerminees = championnat.journees?.filter(j => {
    const dateJournee = new Date(j.date);
    dateJournee.setHours(0, 0, 0, 0);
    return dateJournee < aujourdhui;
  }) || [];

  // 🔴 Journées en cours (date = aujourd'hui)
  const journeesEnCours = championnat.journees?.filter(j => {
    const dateJournee = new Date(j.date);
    dateJournee.setHours(0, 0, 0, 0);
    return dateJournee.getTime() === aujourdhui.getTime();
  }) || [];

  // 📅 Journées à venir (date > aujourd'hui)
  const journeesAVenir = championnat.journees?.filter(j => {
    const dateJournee = new Date(j.date);
    dateJournee.setHours(0, 0, 0, 0);
    return dateJournee > aujourdhui;
  }) || [];

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* 🏆 Bandeau titre */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-700 to-sky-600 p-6 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold mb-1">{championnat.nom}</h1>
          <p className="text-sm text-cyan-100 italic">
            Saison {championnat.saison}
          </p>
        </div>

        {/* 📋 Contenu */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">Catégorie :</span>
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
              {championnat.categorie}
            </span>
          </div>

          <div className="space-y-2 text-gray-600 mb-6">
            <p>
              <span className="font-semibold">Date début :</span>{" "}
              {new Date(championnat.dateDebut).toLocaleDateString("fr-FR")}
            </p>
            <p>
              <span className="font-semibold">Date fin :</span>{" "}
              {new Date(championnat.dateFin).toLocaleDateString("fr-FR")}
            </p>
          </div>

          {/* � Journées en cours (aujourd'hui) */}
          {journeesEnCours.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-red-700 mb-3 border-b pb-1 border-red-200">
                🔴 Journée en cours
              </h2>
              <ul className="divide-y divide-gray-200">
                {journeesEnCours.map((j) => (
                  <li
                    key={j._id || j.numero}
                    className="py-3 flex justify-between items-center hover:bg-red-50 transition duration-150 px-2 rounded"
                  >
                    <Link
                      to={`/journee/${j._id}`}
                      className="flex-1 flex justify-between items-center mr-2"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 hover:text-red-700">
                          Journée {j.numero}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(j.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full ml-3">
                        {j.lieu}
                      </span>
                    </Link>
                    {/* 🔒 Bouton supprimer visible UNIQUEMENT pour les admins connectés */}
                    {isAuthenticated && userRole === "admin" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("🖱️ Clic sur bouton supprimer (journée en cours)");
                          handleDeleteJournee(j._id, j.numero);
                        }}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded whitespace-nowrap"
                        type="button"
                      >
                        🗑️ Supprimer
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 📅 Journées à venir */}
          {journeesAVenir.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-cyan-700 mb-3 border-b pb-1 border-cyan-200">
                📅 Prochaines journées
              </h2>
              <ul className="divide-y divide-gray-200">
                {journeesAVenir.map((j) => (
                  <li
                    key={j._id || j.numero}
                    className="py-3 flex justify-between items-center hover:bg-cyan-50 transition duration-150 px-2 rounded"
                  >
                    <Link
                      to={`/journee/${j._id}`}
                      className="flex-1 flex justify-between items-center mr-2"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 hover:text-cyan-700">
                          Journée {j.numero}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(j.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full ml-3">
                        {j.lieu}
                      </span>
                    </Link>
                    {/* 🔒 Bouton supprimer visible UNIQUEMENT pour les admins connectés */}
                    {isAuthenticated && userRole === "admin" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("🖱️ Clic sur bouton supprimer (journée à venir)");
                          handleDeleteJournee(j._id, j.numero);
                        }}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded whitespace-nowrap"
                        type="button"
                      >
                        🗑️ Supprimer
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Journées terminées */}
          {journeesTerminees.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-green-700 mb-3 border-b pb-1 border-green-200">
                ✅ Journées terminées
              </h2>
              <ul className="divide-y divide-gray-200">
                {journeesTerminees.map((j) => (
                  <li
                    key={j._id || j.numero}
                    className="py-3 flex justify-between items-center hover:bg-green-50 transition duration-150 px-2 rounded"
                  >
                    <Link
                      to={`/journee/${j._id}`}
                      className="flex-1 flex justify-between items-center mr-2"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 hover:text-green-700">
                          Journée {j.numero}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(j.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full ml-3">
                        {j.lieu}
                      </span>
                    </Link>
                    {/* 🔒 Bouton supprimer visible UNIQUEMENT pour les admins connectés */}
                    {isAuthenticated && userRole === "admin" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("🖱️ Clic sur bouton supprimer (journée terminée)");
                          handleDeleteJournee(j._id, j.numero);
                        }}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded whitespace-nowrap"
                        type="button"
                      >
                        🗑️ Supprimer
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Message si aucune journée */}
          {championnat.journees && championnat.journees.length === 0 && (
            <p className="text-sm italic text-gray-500 mb-6">
              Aucune journée enregistrée pour ce championnat.
            </p>
          )}

          {/* 🏅 Bouton pour voir le classement */}
          <div className="text-center mb-8">
            <Link
              to={`/championnat/${championnat._id}/classement`}
              className="inline-block bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium rounded-lg px-5 py-2.5 shadow-md hover:from-cyan-700 hover:to-blue-800 focus:ring-4 focus:ring-cyan-300 transition duration-200"
            >
              🏅 Voir le classement
            </Link>
          </div>

          {/* 🧭 Navigation */}
          <div className="flex justify-between">
            <Link
              to="/championnats"
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              ← Retour aux championnats
            </Link>
            {/* 🔒 Bouton visible UNIQUEMENT pour les admins connectés */}
            {isAuthenticated && userRole === "admin" && (
              <Link
                to={`/admin/championnat/${championnat._id}/add-journee`}
                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                + Ajouter une journée
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionnatDetails;
