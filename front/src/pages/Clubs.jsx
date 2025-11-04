import api from "../api/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [clubsPerPage] = useState(20);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        setUserRole(decodedPayload.role); // <- clé "role" dans ton JWT
      } catch (error) {
        console.error("Erreur décodage JWT :", error);
      }
    }
  }, []);

  // ✅ Chargement des clubs à l'ouverture
  useEffect(() => {
    api
      .get("/club/all")
      .then((res) => {
        const sortedClubs = (res.data || []).sort((a, b) => 
          a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
        );
        setClubs(sortedClubs);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err.message || "Erreur lors du chargement des clubs");
        setLoaded(true);
      });
  }, []);
  // 🧩 Fonction utilitaire : supprime les accents et met en minuscule
const normalize = (str) =>
  str
    ?.toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase() || "";

// 🔍 Filtrage instantané des clubs selon le texte recherché
const filteredClubs = clubs.filter((club) => {
  const q = normalize(searchTerm);
  return (
    normalize(club.nom).includes(q) ||
    normalize(club.ville).includes(q) ||
    normalize(club.codePostal).includes(q)
  );
});

// 📄 Pagination appliquée sur le résultat filtré
const indexOfLastClub = currentPage * clubsPerPage;
const indexOfFirstClub = indexOfLastClub - clubsPerPage;
const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);
const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);


  // ✅ États de chargement
  if (!loaded)
    return <h2 className="text-center mt-10 text-gray-500">Chargement...</h2>;
  if (error)
    return <h2 className="text-center text-red-500 mt-10">Erreur : {error}</h2>;

  return (
    <div className="w-full mt-10 mx-auto max-w-screen-xl px-4">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-4">
        TROUVER UN CLUB
      </h1>

      {/* 🔍 Barre de recherche */}
      {/* 🔍 Barre de recherche instantanée (accents ignorés) */}
<div className="max-w-md mx-auto mb-8 relative">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  </div>

  <input
    type="search"
    id="default-search"
    placeholder="Nom du club, ville, code postal..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // ↩️ revien automatiquement à la 1ère page
    }}
    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
               rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
  />
</div>


      {/* 🏆 Liste des clubs */}
      {clubs.length > 0 ? (
        <>
          {/* Informations sur la pagination */}
          <div className="text-center text-gray-600 mb-4">
            Affichage des clubs {indexOfFirstClub + 1} à {Math.min(indexOfLastClub, clubs.length)} sur {clubs.length} clubs
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 my-6 justify-items-center">
            {currentClubs.map((club) => (
              <Link
                key={club._id}
                to={`/clubs/${club._id}`}
                className="group rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 block w-full max-w-sm"
              >
            {/* ✅ Image du club */}
            <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
              {club.logo && club.logo.length > 0 ? (
                <img
                  src={club.logo}
                  alt={club.nom}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500 p-4"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏛️</div>
                    <p className="text-sm">Pas de logo</p>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Infos du club */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-red-700 mb-2 group-hover:text-red-800">
                {club.nom}
              </h3>
              <div className="text-gray-700 text-sm space-y-1">
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  {club.adresse}
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🏘️</span>
                  {club.codePostal} {club.ville}
                </p>
                {club.email && (
                  <p className="flex items-center">
                    <span className="mr-2">✉️</span>
                    {club.email}
                  </p>
                )}
              </div>
              
              <div className="mt-4 text-right">
                <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
                  Voir les détails →
                </span>
              </div>
            </div>
          </Link>
        ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              {/* Bouton Précédent */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                ← Précédent
              </button>

              {/* Numéros de page */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-lg font-medium ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Bouton Suivant */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 my-8">Aucun club trouvé</p>
      )}
      
      {/* 🔐 Bouton ajouter club - Réservé aux admins */}
      {userRole === "admin" && (
        <div className="text-center mt-8 mb-16">
          <Link
            to="/clubs/new"
            className="inline-block text-white bg-gradient-to-r from-green-600 to-green-700 
                       hover:from-green-700 hover:to-green-800 font-semibold 
                       rounded-full px-6 py-3 shadow-md hover:shadow-lg transition duration-300"
          >
            ➕ Ajouter un club
          </Link>
        </div>
      )}
    </div>
  );
};

export default Clubs;
