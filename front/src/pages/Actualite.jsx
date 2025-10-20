import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const Actualites = () => {
  const [actualites, setActualites] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/actualite/all")
      .then((res) => {
        setActualites(res.data || []);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err.message || "Erreur lors du chargement des actualités");
        setLoaded(true);
      });
  }, []);

  if (!loaded)
    return <h2 className="text-center mt-10 text-gray-500">Chargement...</h2>;
  if (error)
    return <h2 className="text-center text-red-500 mt-10">Erreur : {error}</h2>;
  if (!actualites.length)
    return <h2 className="text-center mt-10">Aucune actualité trouvée</h2>;

  return (
    <>
      <Header />

      {/* 🏁 En-tête de page */}
      <div className="mt-[180px] sm:mt-[200px] md:mt-[220px] text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 drop-shadow-lg">
          Toutes les actualités
        </h1>
        <p className="text-gray-600 mt-2">
          Retrouvez l’ensemble des actualités du district de pétanque.
        </p>
      </div>

      {/* 📰 Grille d’actualités */}
      <section className="max-w-screen-xl mx-auto p-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {actualites.map((actu) => (
            <Link
              to={`/actualite/${actu._id}`}
              key={actu._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition block group"
            >
              {actu.images && actu.images.length > 0 ? (
                <img
                  src={`http://localhost:3000${actu.images[0].url}`}
                  alt={actu.images[0].description}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Pas d’image
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  {actu.titre}
                </h3>
                <p className="text-gray-700 text-sm line-clamp-4">
                  {actu.contenu}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Publiée le{" "}
                  {new Date(actu.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 🔙 Bouton retour */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-full 
                       font-semibold shadow-md hover:bg-red-700 hover:shadow-lg 
                       transition duration-300"
          >
            ← Retour à l’accueil
          </Link>
        </div>
      </section>
    </>
  );
};

export default Actualites;
