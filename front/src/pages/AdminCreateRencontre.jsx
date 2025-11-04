import { useState, useEffect } from "react";
import axios from "axios";
import "flowbite";
import { useParams } from "react-router-dom";

/**
 * ⚔️ Formulaire d’administration : ajouter une rencontre à une journée
 * --------------------------------------------------------------------
 * Envoie les données vers POST /rencontre/create
 */
const AdminAddRencontre = () => {
  const [journees, setJournees] = useState([]);
  const [formData, setFormData] = useState({
    equipeA: "",
    equipeB: "",
    scoreA: "",
    scoreB: "",
    date: "",
    lieu: "",
    partie: "",
    journeeId: useParams().id,
    
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Charger les journées existantes pour la liste déroulante
  useEffect(() => {
    axios
      .get("http://localhost:3000/journee/all")
      .then((res) => setJournees(res.data))
      .catch((err) => console.error("Erreur chargement journées :", err));
  }, []);

  // ✏️ Gérer le changement des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // 📋 Préparer les données en nettoyant les valeurs vides
      const dataToSend = {
        equipeA: formData.equipeA,
        equipeB: formData.equipeB,
        date: formData.date,
        lieu: formData.lieu,
        journeeId: formData.journeeId,
        // N'envoyer scoreA/scoreB/partie que s'ils ont une valeur
        ...(formData.scoreA && { scoreA: Number(formData.scoreA) }),
        ...(formData.scoreB && { scoreB: Number(formData.scoreB) }),
        ...(formData.partie && { partie: Number(formData.partie) }),
      };
      
      const res = await axios.post("http://localhost:3000/rencontre/create", dataToSend);
      setMessage("✅ Rencontre ajoutée avec succès !");
      setFormData({
        equipeA: "",
        equipeB: "",
        scoreA: "",
        scoreB: "",
        date: "",
        lieu: "",
        partie: "",
        journeeId: formData.journeeId, // ✅ Garder le journeeId
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout de la rencontre:", err);
      setMessage("❌ Erreur : " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ➕ Ajouter une rencontre
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🏆 Sélection de la journée */}
      

        {/* ⚔️ Équipes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Équipe A :
            </label>
            <input
              type="text"
              name="equipeA"
              value={formData.equipeA}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Ex : Belvérine"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Équipe B :
            </label>
            <input
              type="text"
              name="equipeB"
              value={formData.equipeB}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Ex : Aubigny"
            />
          </div>
        </div>

        {/* � Date et heure */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date et heure de la rencontre :
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        {/* 📍 Lieu */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Lieu :
          </label>
          <input
            type="text"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            required
            placeholder="Ex : Terrain 1, Boulodrome..."
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        {/* 🧮 Partie + Scores */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Partie :
            </label>
            <input
              type="number"
              name="partie"
              value={formData.partie}
              onChange={handleChange}
              placeholder="1"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Score A :
            </label>
            <input
              type="number"
              name="scoreA"
              value={formData.scoreA}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Score B :
            </label>
            <input
              type="number"
              name="scoreB"
              value={formData.scoreB}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 🔘 Bouton d’envoi */}
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {loading ? "Enregistrement..." : "Ajouter la rencontre"}
        </button>

        {/* 📢 Message */}
        {message && (
          <p
            className={`text-center mt-3 font-semibold ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminAddRencontre;
