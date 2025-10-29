import { useState } from "react";
import api from "../api/axios";

const ActualiteForm = () => {
  const [data, setData] = useState({
    titre: "",
    contenu: "",
  });
  const [images, setImages] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Changement générique
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // 🔹 Gestion du fichier + prévisualisation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // 🔹 Envoi Axios multipart
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      if (images) formData.append("images", images);

      await api.post("/actualite/create", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });

      setMessage("✅ Actualité enregistrée avec succès !");
      setData({
        titre: "",
        contenu: "",
      });
      setImages(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l’envoi du formulaire.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          📰 Créer une Actualité
        </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <div>
          <label
            htmlFor="titre"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Titre
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={data.titre}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* Contenu */}
        <div>
          <label
            htmlFor="contenu"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contenu
          </label>
          <textarea
            id="contenu"
            name="contenu"
            value={data.contenu}
            onChange={handleChange}
            required
            rows="5"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* Upload images */}
        <div>
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Image (optionnelle)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg 
                       cursor-pointer bg-gray-50 focus:outline-none"
          />
          {preview && (
            <img
              src={preview}
              alt="Prévisualisation"
              className="mt-3 w-40 h-40 object-cover rounded-lg border shadow-sm"
            />
          )}
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-gradient-to-r from-cyan-600 to-blue-600 
                     hover:from-cyan-700 hover:to-blue-700 focus:ring-4 
                     focus:outline-none focus:ring-cyan-300 font-medium 
                     rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          {loading ? "⏳ Envoi en cours..." : "Enregistrer"}
        </button>

        {/* Message */}
        {message && (
          <div
            className={`mt-3 p-3 rounded-lg text-center font-medium ${
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

export default ActualiteForm;
