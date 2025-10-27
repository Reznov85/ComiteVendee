import { useState } from "react";
import api from "../api/axios";

const ClubForm = () => {
  const [data, setData] = useState({
    nom: "",
    adresse: "",
    codePostal: "",
    ville: "",
    email: "",
    dateAffiliation: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ------------------------------------------------------------
     📝 Gestion des champs texte
  ------------------------------------------------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* ------------------------------------------------------------
     🖼️ Gestion du fichier + prévisualisation
  ------------------------------------------------------------ */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  /* ------------------------------------------------------------
     🚀 Soumission du formulaire
  ------------------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // ✅ Validation basique côté client
    if (!data.nom.trim() || !data.adresse.trim() || !data.codePostal.trim() || !data.ville.trim()) {
      setMessage("❌ Merci de remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      if (logo) formData.append("logo", logo);

      await api.post("/club/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Club enregistré avec succès !");
      setData({
        nom: "",
        adresse: "",
        codePostal: "",
        ville: "",
        email: "",
        dateAffiliation: "",
      });
      setLogo(null);
      setPreview(null);
    } catch (error) {
      console.error("Erreur soumission :", error);
      setMessage("❌ Erreur lors de l’enregistrement du club.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------
     🎨 Rendu du formulaire
  ------------------------------------------------------------ */
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          🏛️ Créer un Club
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900">
              Nom du club <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={data.nom}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>

          {/* Adresse */}
          <div>
            <label htmlFor="adresse" className="block mb-2 text-sm font-medium text-gray-900">
              Adresse <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={data.adresse}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>

          {/* Code Postal & Ville */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="codePostal" className="block mb-2 text-sm font-medium text-gray-900">
                Code postal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="codePostal"
                name="codePostal"
                value={data.codePostal}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                           focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                required
              />
            </div>
            <div>
              <label htmlFor="ville" className="block mb-2 text-sm font-medium text-gray-900">
                Ville <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ville"
                name="ville"
                value={data.ville}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                           focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>

          {/* Date d'affiliation */}
          <div>
            <label htmlFor="dateAffiliation" className="block mb-2 text-sm font-medium text-gray-900">
              Date d’affiliation
            </label>
            <input
              type="date"
              id="dateAffiliation"
              name="dateAffiliation"
              value={data.dateAffiliation}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>

          {/* Logo */}
          <div>
            <label htmlFor="logo" className="block mb-2 text-sm font-medium text-gray-900">
              Logo (optionnel)
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg 
                         cursor-pointer bg-gray-50 focus:outline-none"
            />
            {preview && (
              <img
                src={preview}
                alt="Prévisualisation du logo"
                className="mt-3 w-40 h-40 object-cover rounded-lg border shadow"
              />
            )}
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-5 text-sm font-medium text-white 
                       bg-gradient-to-r from-cyan-600 to-blue-600 
                       hover:from-cyan-700 hover:to-blue-700 
                       focus:ring-4 focus:ring-cyan-300 rounded-lg 
                       transition-all duration-200"
          >
            {loading ? "⏳ Envoi en cours..." : "💾 Enregistrer le club"}
          </button>

          {/* Message */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-center font-medium ${
                message.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default ClubForm;
