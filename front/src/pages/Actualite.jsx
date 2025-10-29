import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "flowbite";

const Actualites = () => {
  const [actualites, setActualites] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  /**
   * 🔐 EFFET 1 : VÉRIFICATION DU RÔLE UTILISATEUR
   * =============================================
   * 
   * Ce useEffect s'exécute UNE SEULE FOIS au montage du composant (grâce au [])
   * Son rôle : Vérifier si l'utilisateur connecté est un admin
   * 
   * 🎯 POURQUOI ?
   * Pour afficher le bouton "➕ Créer une actualité" UNIQUEMENT aux admins
   * (voir plus bas dans le JSX : {userRole === "admin" && ...})
   */
  useEffect(() => {
    // 📦 ÉTAPE 1 : Récupérer le token JWT depuis le localStorage
    // Le token a été stocké lors de la connexion (voir Login.jsx)
    const token = localStorage.getItem("token");
    
    // ✅ ÉTAPE 2 : Vérifier si un token existe
    if (token) {
      try {
        // 🔍 ÉTAPE 3 : Décoder le token JWT pour extraire les informations
        
        // Un JWT est composé de 3 parties séparées par des points : header.payload.signature
        // Exemple : "eyJhbGci.eyJpZCI6IjEyMy.SflKxwRJ"
        //           ^^^^^^^^  ^^^^^^^^^^  ^^^^^^^^^^
        //           [0]       [1]         [2]
        //           header    PAYLOAD     signature
        
        // On récupère la partie [1] (payload) qui contient les données utilisateur
        const payloadBase64 = token.split(".")[1];
        
        // 🔄 ÉTAPE 4 : Décoder le payload (qui est en base64)
        // atob() = fonction JavaScript pour décoder du base64
        // JSON.parse() = convertir la chaîne JSON en objet JavaScript
        const decodedPayload = JSON.parse(atob(payloadBase64));
        
        // 💾 ÉTAPE 5 : Extraire le rôle et le stocker dans l'état
        // Le payload contient des infos comme : { id: "123", email: "user@mail.com", role: "admin" }
        setUserRole(decodedPayload.role); // On extrait juste le "role"
        
      } catch (error) {
        // ❌ Si le token est invalide ou corrompu, on affiche l'erreur
        console.error("Erreur décodage JWT :", error);
        // userRole reste null, donc les boutons admin ne s'afficheront pas
      }
    }
    // Si pas de token, userRole reste null (utilisateur non connecté)
    
  }, []); // [] = s'exécute qu'une seule fois au montage du composant

  /**
   * 🔄 EFFET 2 : CHARGEMENT DES ACTUALITÉS
   * =======================================
   * Ce useEffect récupère toutes les actualités depuis l'API
   */

  useEffect(() => {
    console.log("rôle décodé :", userRole)
    api
      .get("/actualite/all")
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
    <section className="max-w-screen-xl mx-auto mt-[180px] p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-red-700 drop-shadow-lg mb-10">
        Toutes les actualités
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {actualites.map((actu) => (
          <div
            key={actu._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <Link to={`/actualite/${actu._id}`}>
              {actu.images && actu.images.length > 0 ? (
                <img
                  src={`${api.defaults.baseURL}${actu.images[0].url}`}
                  alt={actu.images[0].description}
                  className="rounded-t-2xl w-full h-56 object-cover hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-500">
                  Pas d’image
                </div>
              )}
            </Link>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700 hover:underline">
                {actu.titre}
              </h5>
              <p className="mb-3 font-normal text-gray-700 line-clamp-4">
                {actu.contenu}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Publiée le{" "}
                {new Date(actu.createdAt).toLocaleDateString("fr-FR")}
              </p>
              <Link
                to={`/actualite/${actu._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                Lire la suite →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/"
          className="inline-block text-white bg-gradient-to-r from-red-600 to-red-700 
                     hover:from-red-700 hover:to-red-800 font-semibold 
                     rounded-full px-6 py-3 shadow-md hover:shadow-lg transition duration-300"
        >
          ← Retour à l’accueil
        </Link>

        {userRole === "admin" && (
          <Link
            to="/actualite/new"
            className="inline-block ml-4 text-white bg-gradient-to-r from-green-600 to-green-700 
                       hover:from-green-700 hover:to-green-800 font-semibold 
                       rounded-full px-6 py-3 shadow-md hover:shadow-lg transition duration-300"
          >
            ➕ Créer une actualité
          </Link>
        )}
      </div>
    </section>
  );
};

export default Actualites;
