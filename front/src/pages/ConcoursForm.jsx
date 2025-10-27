import React, { useState } from "react";
import api from "../api/axios";

const AdminConcoursForm = () => {
  const [form, setForm] = useState({
    titre: "",
    date: "",
    lieu: "",
    club: "",
    type: "Doublette",
    categorie: "Senior",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      if (file) data.append("affiche", file);

  await api.post("/concours/new", data);
      setMessage("✅ Concours ajouté avec succès !");
      setForm({
        titre: "",
        date: "",
        lieu: "",
        club: "",
        type: "Doublette",
        categorie: "Senior",
        description: "",
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l’ajout du concours");
    }
  };

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
        Ajouter un concours
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titre"
          placeholder="Titre du concours"
          value={form.titre}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        <input
          type="text"
          name="lieu"
          placeholder="Lieu"
          value={form.lieu}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        <input
          type="text"
          name="club"
          placeholder="Club organisateur"
          value={form.club}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <div className="flex gap-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded-lg p-2 flex-1"
          >
            <option>Doublette</option>
            <option>Triplette</option>
            <option>Tête-à-tête</option>
            <option>Mixte</option>
          </select>

          <select
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            className="border rounded-lg p-2 flex-1"
          >
            <option>Senior</option>
            <option>Vétéran</option>
            <option>Jeune</option>
            <option>Féminin</option>
            <option>Promotion</option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          rows="3"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          accept="image/*"
        />

        <button
          type="submit"
          className="w-full bg-red-700 text-white font-semibold rounded-lg py-2 hover:bg-red-600 transition"
        >
          Ajouter le concours
        </button>
      </form>

      {message && (
        <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
      )}
    </section>
  );
};

export default AdminConcoursForm;
