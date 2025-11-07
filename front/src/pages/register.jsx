import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    role: "user",
    fonction: "",
    photo: null,
    reportsTo: "", // 👈 ajout
  });

  const [users, setUsers] = useState([]); // 👈 liste des utilisateurs existants
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // 🔄 Charger les utilisateurs existants pour le select reportsTo
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/utilisateur/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur chargement utilisateurs :", err);
      }
    };
    fetchUsers();
  }, []);

  // 🧾 Gère les champs texte
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📸 Gère la photo
  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // 🚀 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      })

      const res = await axios.post(
        "http://localhost:3000/utilisateur/register",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(`✅ Utilisateur ${res.data.prenom} créé avec succès !`);
      setFormData({
        prenom: "",
        nom: "",
        email: "",
        password: "",
        role: "user",
        fonction: "",
        photo: null,
        reportsTo: "",
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "❌ Erreur lors de la création."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        👤 Créer un nouvel utilisateur
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prénom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Fonction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fonction
          </label>
          <select
            name="fonction"
            value={formData.fonction}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          >
            <option value="">Sélectionner une fonction</option>
            <option value="president">Président</option>
            <option value="vice-president">Vice-Président</option>
            <option value="secretaire">Secrétaire Général</option>
            <option value="secretaireadjoint">Secrétaire Adjoint</option>
            <option value="tresorier">Trésorier</option>
            <option value="tresorieradjoint">Trésorier Adjoint</option>
          </select>
        </div>

        {/* Rôle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rôle
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        {/* Reports To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supérieur hiérarchique
          </label>
          <select
            name="reportsTo"
            value={formData.reportsTo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          >
            <option value="">Aucun (niveau supérieur)</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.prenom} {u.nom} — {u.fonction || "Aucune fonction"}
              </option>
            ))}
          </select>
        </div>

        {/* Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo de profil
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 rounded-lg font-semibold transition`}
        >
          {loading ? "⏳ Création..." : "Créer l'utilisateur"}
        </button>
      </form>

      {/* Feedback */}
      {message && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default Register;
