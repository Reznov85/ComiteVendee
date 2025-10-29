import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

/**
 * 📅 Page de détails d'une journée
 * --------------------------------
 * Affiche les infos d'une journée d’un championnat :
 * numéro, date, lieu, rencontres associées, etc.
 */
const JourneeDetails = () => {
  const { id } = useParams();
  const [journee, setJournee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Gestion de l'édition du score
  const [editingId, setEditingId] = useState(null);
  const [scoreA, setScoreA] = useState("");
  const [scoreB, setScoreB] = useState("");

  useEffect(() => {
    api
      .get(`/journee/${id}`)
      .then((res) => {
        setJournee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Fonction pour lancer l'édition d'un score
  const handleEditScore = (r) => {
    setEditingId(r._id);
    setScoreA(r.scoreA ?? "");
    setScoreB(r.scoreB ?? "");
  };

  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingId(null);
    setScoreA("");
    setScoreB("");
  };

  // Fonction pour soumettre le score modifié
  const handleSaveScore = async (r) => {
    try {
      const res = await api.put(`/rencontre/${r._id}/score`, {
        scoreA: Number(scoreA),
        scoreB: Number(scoreB),
      });
      setJournee((prev) => ({
        ...prev,
        rencontres: prev.rencontres.map((rencontre) =>
          rencontre._id === r._id
            ? { ...rencontre, scoreA: res.data.scoreA, scoreB: res.data.scoreB }
            : rencontre
        ),
      }));
      handleCancelEdit();
    } catch (err) {
      alert("Erreur lors de la modification du score : " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Erreur : {error}</div>;
  }

  if (!journee)
    return (
      <div className="text-center text-gray-500 mt-10">
        Aucune donnée trouvée pour cette journée
      </div>
    );

  // Séparer les rencontres terminées des rencontres programmées
  const rencontresTerminees = journee.rencontres?.filter(r => r.scoreA != null && r.scoreB != null) || [];
  const rencontresProgrammees = journee.rencontres?.filter(r => r.scoreA == null || r.scoreB == null) || [];

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* 🏷️ En-tête */}
        <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-600 p-6 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold mb-1">
            Journée {journee.numero}
          </h1>
          <p className="text-sm text-cyan-100 italic">
            {new Date(journee.date).toLocaleDateString("fr-FR")} — {journee.lieu}
          </p>
        </div>

        {/* 🏆 Contenu principal */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Lieu :</span> {journee.lieu}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Date :</span>{" "}
            {new Date(journee.date).toLocaleDateString("fr-FR")}
          </p>

          {/* ✅ Rencontres terminées */}
          {rencontresTerminees.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-green-700 mb-2 border-b pb-1 border-green-200">
                ✅ Rencontres terminées
              </h2>
              <ul className="divide-y divide-gray-200">
                {rencontresTerminees.map((r) => (
                  <li
                    key={r._id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {r.equipeA} 🆚 {r.equipeB}
                      </p>
                      <p className="text-sm text-gray-500">
                        Terrain : {r.terrain || "non défini"}
                      </p>
                    </div>
                    {/* Affichage du score ou du formulaire d'édition */}
                    <div>
                      {editingId === r._id ? (
                        <form
                          className="flex items-center gap-2"
                          onSubmit={e => { e.preventDefault(); handleSaveScore(r); }}
                        >
                          <input
                            type="number"
                            value={scoreA}
                            onChange={e => setScoreA(e.target.value)}
                            className="w-12 px-2 py-1 border rounded"
                            min="0"
                            required
                          />
                          <span>-</span>
                          <input
                            type="number"
                            value={scoreB}
                            onChange={e => setScoreB(e.target.value)}
                            className="w-12 px-2 py-1 border rounded"
                            min="0"
                            required
                          />
                          <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Enregistrer</button>
                          <button type="button" className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500" onClick={handleCancelEdit}>Annuler</button>
                        </form>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            {r.scoreA} - {r.scoreB}
                          </span>
                          <button
                            className="ml-2 text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded"
                            onClick={() => handleEditScore(r)}
                          >
                            Modifier
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ⚔️ Rencontres programmées */}
          {rencontresProgrammees.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-cyan-700 mb-2 border-b pb-1 border-cyan-200">
                📅 Rencontres programmées
              </h2>
              <ul className="divide-y divide-gray-200">
                {rencontresProgrammees.map((r) => (
                  <li
                    key={r._id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {r.equipeA} 🆚 {r.equipeB}
                      </p>
                      <p className="text-sm text-gray-500">
                        Terrain : {r.terrain || "non défini"}
                      </p>
                    </div>
                    {/* Affichage du score ou du formulaire d'édition */}
                    <div>
                      {editingId === r._id ? (
                        <form
                          className="flex items-center gap-2"
                          onSubmit={e => { e.preventDefault(); handleSaveScore(r); }}
                        >
                          <input
                            type="number"
                            value={scoreA}
                            onChange={e => setScoreA(e.target.value)}
                            className="w-12 px-2 py-1 border rounded"
                            min="0"
                            required
                          />
                          <span>-</span>
                          <input
                            type="number"
                            value={scoreB}
                            onChange={e => setScoreB(e.target.value)}
                            className="w-12 px-2 py-1 border rounded"
                            min="0"
                            required
                          />
                          <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Enregistrer</button>
                          <button type="button" className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500" onClick={handleCancelEdit}>Annuler</button>
                        </form>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm italic text-gray-400">
                            À venir
                          </span>
                          <button
                            className="ml-2 text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded"
                            onClick={() => handleEditScore(r)}
                          >
                            Ajouter le score
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Message si aucune rencontre */}
          {journee.rencontres && journee.rencontres.length === 0 && (
            <p className="text-sm italic text-gray-500">
              Aucune rencontre enregistrée pour cette journée.
            </p>
          )}

          {/* 🧭 Navigation */}
          <div className="flex justify-between mt-6">
            <Link
              to={`/championnat/${journee.championnat?._id || journee.championnat}`}
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              ← Retour au championnat
            </Link>

            <Link
              to={`/admin/journee/${journee._id || journee.id}/add-rencontre`}
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              ➕ Ajouter une rencontre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneeDetails;
