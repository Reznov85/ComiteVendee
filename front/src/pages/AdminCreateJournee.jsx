import { useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminAddJournee = ({ championnatId }) => {
    const { id } = useParams(); // ✅ récupère l'id du championnat dans l'URL

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numero: "",
    date: "",
    lieu: "",
    championnat: id,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ------------------------------------------------------------
     📝 Gestion des champs
  ------------------------------------------------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ------------------------------------------------------------
     🚀 Soumission du formulaire
  ------------------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await api.post(
        `/journee/create`,
        formData
      );
      setMessage("✅ Journée ajoutée avec succès !");
      setFormData({ numero: "", date: "", lieu: "" });
    setTimeout(() => navigate(`/championnat/${id}`), 2000);
    } catch (err) {
      setMessage("❌ Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-cyan-700 mb-4 text-center">
        ➕ Ajouter une journée
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Numéro de journée */}
        <div>
          <label
            htmlFor="numero"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Numéro de journée
          </label>
          <input
            type="number"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="Ex : 1"
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Date de la journée
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          />
        </div>

        {/* Lieu */}
        <div>
          <label
            htmlFor="lieu"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Lieu
          </label>
          <input
            type="text"
            id="lieu"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="Ex : La Roche-sur-Yon"
          />
        </div>

        {/* Bouton */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-cyan-400 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-800"
            } text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-cyan-300`}
          >
            {loading ? "Envoi..." : "Ajouter la journée"}
          </button>
        </div>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`text-center mt-4 text-sm ${
            message.includes("Erreur") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminAddJournee;
