import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ClubEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    nom: "",
    president: "",
    adresse: "",
    codePostal: "",
    ville: "",
    email: "",
    telephone: "",
    dateAffiliation: "",
    adresseTerrain: "",
  });

  const [logo, setLogo] = useState(null);
  const [currentLogo, setCurrentLogo] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Charger les données du club
  useEffect(() => {
    api
      .get(`/club/${id}`)
      .then((res) => {
        const club = res.data;
        setData({
          nom: club.nom || "",
          president: club.president || "",
          adresse: club.adresse || "",
          codePostal: club.codePostal || "",
          ville: club.ville || "",
          email: club.email || "",
          telephone: club.telephone || "",
          dateAffiliation: club.dateAffiliation ? club.dateAffiliation.split('T')[0] : "",
          adresseTerrain: club.adresseTerrain || "",
        });
        setCurrentLogo(club.logo || "");
        setLoadingData(false);
      })
      .catch((err) => {
        console.error("Erreur chargement club:", err);
        setMessage("❌ Erreur lors du chargement du club");
        setLoadingData(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!data.nom.trim() || !data.adresse.trim() || !String(data.codePostal).trim() || !data.ville.trim()) {
      setMessage("❌ Merci de remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      if (logo) formData.append("logo", logo);

      await api.put(`/club/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Club modifié avec succès !");
      setTimeout(() => navigate(`/clubs/${id}`), 2000);
    } catch (error) {
      console.error("Erreur soumission :", error);
      setMessage("❌ Erreur lors de la modification du club.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          ✏️ Modifier le Club
        </h2>

        {message && (
          <p
            className={`mb-4 text-center font-semibold ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

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

          {/* Président */}
          <div>
            <label htmlFor="president" className="block mb-2 text-sm font-medium text-gray-900">
              Président(e)
            </label>
            <input
              type="text"
              id="president"
              name="president"
              value={data.president}
              onChange={handleChange}
              placeholder="Nom du président"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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

          {/* Téléphone */}
          <div>
            <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-gray-900">
              Téléphone
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={data.telephone}
              onChange={handleChange}
              placeholder="Ex : 02 51 12 34 56"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>

          {/* Date d'affiliation */}
          <div>
            <label htmlFor="dateAffiliation" className="block mb-2 text-sm font-medium text-gray-900">
              Date d'affiliation
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

          {/* Adresse du terrain */}
          <div>
            <label htmlFor="adresseTerrain" className="block mb-2 text-sm font-medium text-gray-900">
              Adresse du terrain
            </label>
            <input
              type="text"
              id="adresseTerrain"
              name="adresseTerrain"
              value={data.adresseTerrain}
              onChange={handleChange}
              placeholder="Adresse complète du terrain de pétanque"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>

          {/* Logo actuel */}
          {currentLogo && !preview && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Logo actuel
              </label>
              <img
                src={currentLogo.startsWith('http') ? currentLogo : `${api.defaults.baseURL}${currentLogo}`}
                alt="Logo actuel"
                className="w-32 h-32 object-contain border border-gray-300 rounded-lg"
              />
            </div>
          )}

          {/* Upload nouveau logo */}
          <div>
            <label htmlFor="logo" className="block mb-2 text-sm font-medium text-gray-900">
              {currentLogo ? "Changer le logo" : "Logo"} (optionnel)
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
                alt="Aperçu"
                className="mt-3 w-32 h-32 object-contain border border-gray-300 rounded-lg"
              />
            )}
          </div>

          {/* Boutons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 text-white font-medium rounded-lg text-sm px-5 py-2.5 
                         ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
            >
              {loading ? "Modification..." : "💾 Enregistrer les modifications"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/clubs/${id}`)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Annuler
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ClubEditForm;
