import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserEditForm = () => {
  const { id } = useParams(); // ID de l’utilisateur à modifier
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    fonction: "",
    role: "",
    photo: null, // peut être fichier ou URL
  });

  const [preview, setPreview] = useState(null);

  /* ✅ Charger les infos utilisateur au montage */
  useEffect(() => {
    axios
      .get(`http://localhost:3000/utilisateurs/${id}`)
      .then((res) => {
        setUser(res.data);
        // Si l'utilisateur a déjà une photo (URL sur serveur)
        if (res.data.photo) setPreview(res.data.photo);
      })
      .catch((err) => console.error("Erreur chargement utilisateur :", err));
  }, [id]);

  /* ✅ Gestion du texte */
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /* ✅ Gestion de la photo */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, photo: file });
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  /* ✅ Soumission du formulaire */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nom", user.nom);
      formData.append("prenom", user.prenom);
      formData.append("email", user.email);
      formData.append("fonction", user.fonction);
      formData.append("role", user.role);

      // si nouvelle photo uploadée
      if (user.photo instanceof File) {
        formData.append("photo", user.photo);
      }

      await axios.put(`http://localhost:3000/utilisateurs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Utilisateur mis à jour avec succès !");
      navigate("/utilisateurs");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 border border-green-200">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Modifier l’utilisateur
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nom</label>
          <input
            type="text"
            name="nom"
            value={user.nom}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Fonction</label>
          <input
            type="text"
            name="fonction"
            value={user.fonction}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Rôle</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Sélectionner un rôle --</option>
            <option value="admin">Admin</option>
            <option value="president">Président</option>
            <option value="user">Utilisateur</option>
          </select>
        </div>

        {/* ✅ Champ upload photo */}
        <div>
          <label className="block text-gray-700 font-medium">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />

          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              className="w-24 h-24 rounded-full mt-2 mx-auto object-cover border-2 border-green-400"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          💾 Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default UserEditForm;
