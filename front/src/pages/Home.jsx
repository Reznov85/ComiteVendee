import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Pour naviguer entre les pages (actualités, détails, etc.)
import Header from "../components/Header"; // ✅ Ton composant d’en-tête commun
import axios from "axios"; // ✅ Pour faire des requêtes HTTP vers ton backend Node.js

const Home = () => {
  // 🧠 États du composant
  const [data, setData] = useState([]); // Stocke toutes les actualités récupérées depuis le backend
  const [loaded, setLoaded] = useState(false); // Indique si les données ont été chargées
  const [error, setError] = useState(null); // Contient un message d’erreur en cas d’échec de la requête

  // ⚙️ useEffect → s’exécute au montage du composant
  useEffect(() => {
    axios
      .get("http://localhost:3000/actualite/all") // Appel API pour récupérer toutes les actualités
      .then((res) => {
        setData(res.data || []); // Si la réponse contient des données, on les enregistre
        setLoaded(true); // Indique que le chargement est terminé
      })
      .catch((err) => {
        setError(err.message || "Erreur"); // En cas d’erreur (serveur, réseau...)
        setLoaded(true);
      });
  }, []); // [] → exécuter une seule fois au montage

  // 🧾 Gestion des états de chargement ou d’erreur
  if (!loaded)
    return <h2 className="text-center mt-10 text-cyan-700">En cours de chargement...</h2>;

  if (error)
    return <h2 className="text-center text-red-500 mt-10">Erreur : {error}</h2>;

  if (!data.length)
    return <h2 className="text-center mt-10 text-cyan-800">Aucune actualité trouvée</h2>;

  // 🥇 On prend la première actualité pour la mise en avant (si besoin)
  const [highlight, ...others] = data;

  return (
    <>
      {/* 🔝 En-tête du site */}
      <Header />

      {/* 🌅 Section bannière principale */}
      <div className="relative w-full overflow-hidden mt-[180px] sm:mt-[200px] md:mt-[220px]">
        {/* Image de fond */}
        <img
          src="/images/banniere.png"
          alt="Bannière District Pétanque Vendée"
          className="w-full h-[70vh] sm:h-[80vh] md:h-[85vh] object-cover object-top brightness-95"
        />

        {/* Dégradé sombre par-dessus pour améliorer le contraste du texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent"></div>

        {/* Texte superposé sur la bannière */}
        <div className="absolute bottom-10 left-0 right-0 text-center text-white drop-shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-bold">District Pétanque Vendée</h1>
          <p className="text-cyan-100 mt-2 text-lg">Esprit d’équipe, passion et convivialité</p>
        </div>
      </div>

      {/* 📰 Section Actualités */}
      <section className="max-w-screen-xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Actualités récentes
        </h2>

        {/* ✨ Animation personnalisée pour l’apparition fluide des cartes */}
        <style>
          {`
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.8s ease-out forwards;
            }
          `}
        </style>

        {/* 🗞️ 3 dernières actualités affichées sous forme de cartes */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.slice(0, 3).map((actu, index) => (
            <Link
              to={`/actualite/${actu._id}`} // Lien vers la page de détail
              key={actu._id}
              style={{ animationDelay: `${index * 0.2}s` }} // Décalage de l’animation (0.2s entre chaque carte)
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
                         border border-blue-100 hover:border-cyan-300 
                         transition-transform duration-300 hover:-translate-y-1 
                         opacity-0 animate-fadeInUp"
            >
              {/* Image d’illustration (si disponible) */}
              {actu.images && actu.images.length > 0 && (
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:3000${actu.images[0].url}`}
                    alt={actu.images[0].description}
                    className="w-full h-48 object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              {/* Contenu texte de la carte */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {actu.titre}
                </h3>
                <p className="text-gray-700 text-sm line-clamp-4">
                  {actu.contenu}
                </p>
                <p className="text-xs text-cyan-700 mt-3">
                  Publiée le{" "}
                  {new Date(actu.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 🔘 Bouton pour accéder à la page “Toutes les actualités” */}
        <div className="text-center mt-12">
          <Link
            to="/actualite"
            className="inline-block bg-gradient-to-r from-cyan-600 to-blue-700 
                       text-white px-8 py-3 rounded-full font-semibold 
                       shadow-md hover:shadow-lg hover:scale-105 
                       transition-all duration-300"
          >
            Voir toutes les actualités →
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
