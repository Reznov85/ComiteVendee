import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Gestion des champs
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
  const res = await api.post("/utilisateur/login", data);
      const { token } = res.data;

      if (!token) throw new Error("Token manquant dans la réponse du serveur");

      // ✅ Sauvegarde du token dans localStorage
      localStorage.setItem("token", token);

      // ✅ Redirection vers l’accueil (ou autre page)
      navigate("/");

      // Recharge pour mettre à jour le Header
      window.location.reload();
    } catch (err) {
      console.error("Erreur login :", err);
      setError(
        err.response?.data?.message ||
          "Erreur de connexion. Vérifie ton email ou mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-900 via-blue-800 to-sky-600">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Connexion
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-300 rounded-md p-2 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none"
              placeholder="ex: admin@petanque85.fr"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold 
                       hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default Login;
