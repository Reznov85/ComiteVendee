import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const SingleClub = () => {
  const { id } = useParams(); // Récupère l'ID du club depuis l'URL
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/club/${id}`)
      .then((res) => {
        setClub(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement du club");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!club)
    return <p className="text-center mt-10">Aucun club trouvé.</p>;

  return (
    <>
      {/* ✅ Image/Logo principal */}
      <div className="relative w-full overflow-hidden">
        {club.logo ? (
          <div className="w-full h-[60vh] bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
            <img
              src={club.logo.startsWith('http') ? club.logo : `${api.defaults.baseURL}${club.logo}`}
              alt={`Logo ${club.nom}`}
              className="max-h-[50vh] max-w-md object-contain bg-white rounded-lg shadow-2xl p-4"
            />
          </div>
        ) : (
          <div className="w-full h-[60vh] bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
              <div className="text-6xl text-blue-600 mb-4">🏛️</div>
              <h2 className="text-2xl font-bold text-gray-700">{club.nom}</h2>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Informations du club */}
      <section className="max-w-screen-lg mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
            {club.nom}
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Informations générales */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                📍 Informations générales
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-semibold text-gray-600 w-32">Adresse :</span>
                  <span className="text-gray-800">{club.adresse}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="font-semibold text-gray-600 w-32">Ville :</span>
                  <span className="text-gray-800">{club.codePostal} {club.ville}</span>
                </div>
                
                {club.email && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-600 w-32">Email :</span>
                    <a 
                      href={`mailto:${club.email}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {club.email}
                    </a>
                  </div>
                )}
                
                {club.dateAffiliation && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-600 w-32">Affiliation :</span>
                    <span className="text-gray-800">
                      {new Date(club.dateAffiliation).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Section contact/actions */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                📞 Contact
              </h2>
              
              <div className="space-y-4">
                {club.email && (
                  <a
                    href={`mailto:${club.email}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                  >
                    ✉️ Contacter le club
                  </a>
                )}
                
      
              </div>
            </div>
          </div>

          {/* Bouton retour */}
          <div className="text-center mt-8">
            <Link
              to="/clubs"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              ← Retour aux clubs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleClub;