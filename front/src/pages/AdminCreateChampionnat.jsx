import React, { useState } from "react";
import api from "../api/axios";

/**
 * 🏗️ Formulaire d’administration : création d’un championnat
 * ----------------------------------------------------------
 * Permet d’ajouter un championnat de base avant d’y insérer les journées.
 * Utilise ton backend Mongoose : POST /championnat/create
 */
const AdminCreateChampionnat = () => {
  /* ------------------------------------------------------------
     ⚙️ États du formulaire
     ------------------------------------------------------------ */
  const [formData, setFormData] = useState({
    nom: "",
    saison: "",
    categorie: "",
    dateDebut: "",
    dateFin: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ------------------------------------------------------------
     ✏️ Gestion des changements de champs
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

    if (!formData.nom || !formData.saison) {
      setMessage("❌ Le nom et la saison sont obligatoires !");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(
        "/championnat/create",
        formData
      );
      console.log("Réponse serveur :", res.data);
      setMessage("✅ Championnat créé avec succès !");
      setFormData({
        nom: "",
        saison: "",
        categorie: "",
        dateDebut: "",
        dateFin: "",
      });
    } catch (error) {
      console.error("Erreur création championnat :", error);
      setMessage("❌ Erreur lors de la création du championnat.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------
     🖥️ Interface utilisateur
     ------------------------------------------------------------ */
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-xl mt-8 border border-gray-200">
      <h1 className="text-2xl font-bold text-cyan-700 mb-4">
        🏆 Créer un nouveau championnat
      </h1>

      {/* Message d’état */}
      {message && (
        <p
          className={`mb-4 font-semibold ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom du championnat *
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Ex : CDC Open Groupe C"
          />
        </div>

        {/* Saison */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saison *
          </label>
          <input
            type="text"
            name="saison"
            value={formData.saison}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Ex : 2025"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <input
            type="text"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Ex : Open, Féminin, Senior..."
          />
        </div>

        {/* Date de début */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de début
          </label>
          <input
            type="date"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Date de fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de fin
          </label>
          <input
            type="date"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </form>

      {/* Bouton de validation */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {loading ? "Enregistrement..." : "💾 Enregistrer le championnat"}
        </button>
      </div>
    </div>
  );
};

export default AdminCreateChampionnat;
