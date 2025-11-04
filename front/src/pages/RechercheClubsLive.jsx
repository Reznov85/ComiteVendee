import { useEffect, useState } from "react";
import axios from "axios";

/**
 * ⚡ Recherche instantanée des clubs (avec placeholder animé)
 * ------------------------------------------------------------
 * ➤ Recherche à chaque frappe (délai 300ms)
 * ➤ Placeholder qui change automatiquement
 * ➤ Message "aucun club trouvé" animé et stylé
 */
const RechercheClubsLive = () => {
  // 🧩 États React pour gérer les données
  const [query, setQuery] = useState("");        // texte tapé
  const [results, setResults] = useState([]);    // résultats renvoyés par l’API
  const [loading, setLoading] = useState(false); // indicateur de chargement
  const [error, setError] = useState(null);      // message d’erreur
  const [placeholder, setPlaceholder] = useState("Rechercher un club..."); // texte animé du champ

  // 💡 Suggestions pour le placeholder
  const suggestions = [
    "Belvérine",
    "Fontenay Vendée",
    "Thorignaise",
    "Aiguillonnaise",
    "Les Herbiers",
    "La Roche-sur-Yon",
  ];

  // 🎞️ Animation du placeholder (change toutes les 2,5s)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % suggestions.length;
      setPlaceholder(`Ex : ${suggestions[i]}`);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // ⏳ Lancement automatique de la recherche (300ms après chaque frappe)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchClubs(query);
      } else {
        setResults([]); // vide les résultats si champ effacé
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // 🔎 Fonction qui appelle ton API Node/Express
  const searchClubs = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:3000/club/search?q=${encodeURIComponent(term)}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Erreur de connexion au serveur API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* 🔵 Titre principal */}
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-5">
        🔍 Recherche instantanée de clubs
      </h1>

      {/* 🧾 Champ de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 transition-all"
        />
        {/* Affichage d’un petit sablier animé pendant le chargement */}
        {loading && (
          <div className="absolute right-4 top-2.5 text-gray-400 animate-spin">
            ⏳
          </div>
        )}
      </div>

      {/* 📊 Résultats */}
      <div className="mt-5 max-h-80 overflow-y-auto">
        {/* Affiche une erreur serveur s’il y en a une */}
        {error && (
          <p className="text-red-600 text-center py-3 bg-red-50 rounded-lg">
            {error}
          </p>
        )}

        {/* Liste des clubs trouvés */}
        {!error && results.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {results.map((club) => (
              <li
                key={club._id}
                className="py-3 px-3 hover:bg-blue-50 transition rounded-lg cursor-pointer"
              >
                <p className="font-semibold text-gray-800">{club.nom}</p>
                <p className="text-sm text-gray-600">
                  📍 {club.ville} ({club.codePostal})
                </p>
                {club.telephone && (
                  <p className="text-sm text-gray-500">📞 {club.telephone}</p>
                )}
                {club.email && (
                  <p className="text-sm text-blue-600">{club.email}</p>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* ✨ Message "aucun club trouvé" stylé + animé */}
        {!loading && !error && query && results.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-6 animate-fade-in">
            <span className="text-4xl mb-2">😕</span>
            <p className="text-gray-500 italic text-center">
              Aucun club trouvé correspondant à <br />
              <span className="font-semibold text-blue-600">"{query}"</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RechercheClubsLive;
