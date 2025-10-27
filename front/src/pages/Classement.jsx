import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios"; // ton instance Axios avec baseURL
import "flowbite";

/**
 * 🏅 Page de classement d’un championnat
 * -------------------------------------
 * Affiche le classement calculé automatiquement par le backend.
 */
const Classement = () => {
  const { id } = useParams(); // id du championnat
  const [classement, setClassement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/championnat/${id}/classement`)
      .then((res) => {
        setClassement(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement du classement :", err);
        setError("Impossible de charger le classement");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Chargement du classement...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {error}
      </div>
    );

  if (!classement.length)
    return (
      <div className="text-center text-gray-500 mt-10">
        Aucun résultat enregistré pour ce championnat.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
        🏆 Classement du Championnat
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-blue-100 text-blue-900">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">#</th>
              <th scope="col" className="px-4 py-3">Équipe</th>
              <th scope="col" className="px-4 py-3 text-center">J</th>
              <th scope="col" className="px-4 py-3 text-center">G</th>
              <th scope="col" className="px-4 py-3 text-center">N</th>
              <th scope="col" className="px-4 py-3 text-center">P</th>
              <th scope="col" className="px-4 py-3 text-center">Diff</th>
              <th scope="col" className="px-4 py-3 text-center">Pts</th>
            </tr>
          </thead>

          <tbody>
            {classement.map((equipe, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index === 0
                    ? "bg-yellow-100 font-semibold"
                    : index === 1
                    ? "bg-gray-50"
                    : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{equipe.equipe}</td>
                <td className="px-4 py-2 text-center">{equipe.joues}</td>
                <td className="px-4 py-2 text-center">{equipe.gagnes}</td>
                <td className="px-4 py-2 text-center">{equipe.nuls}</td>
                <td className="px-4 py-2 text-center">{equipe.perdus}</td>
                <td className="px-4 py-2 text-center">
                  {equipe.diff > 0 ? `+${equipe.diff}` : equipe.diff}
                </td>
                <td className="px-4 py-2 text-center font-bold text-blue-700">
                  {equipe.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/championnats"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Retour aux championnats
        </Link>
      </div>
    </div>
  );
};

export default Classement;
