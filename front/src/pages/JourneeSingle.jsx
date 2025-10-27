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

  useEffect(() => {
  api
    .get(`/journee/${id}`)
    .then((res) => {
      // console.log("🎯 Données reçues :", res.data);
      setJournee(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-cyan-600 rounded-full" />
        <span className="ml-3 text-gray-600 font-medium">
          Chargement de la journée...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        ❌ Erreur : {error}
      </div>
    );

  if (!journee)
    return (
      <div className="text-center text-gray-500 mt-10">
        Aucune donnée trouvée pour cette journée
      </div>
    );

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

          {/* ⚔️ Rencontres de la journée */}
          {journee.rencontres && journee.rencontres.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-cyan-700 mb-2 border-b pb-1 border-cyan-200">
                Rencontres programmées
              </h2>
              <ul className="divide-y divide-gray-200">
                {journee.rencontres.map((r) => (
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
                    {r.scoreA != null && r.scoreB != null ? (
                      <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {r.scoreA} - {r.scoreB}
                      </span>
                    ) : (
                      <span className="text-sm italic text-gray-400">
                        À venir
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm italic text-gray-500">
              Aucune rencontre enregistrée pour cette journée.
            </p>
          )}

          {/* 🧭 Navigation */}
          <div className="flex justify-between mt-6">
            <Link
              to={`/championnat/${journee.championnat.id}`}
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
