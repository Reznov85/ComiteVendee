import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const ConcoursDetails = () => {
  const { id } = useParams();
  const [concours, setConcours] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/concours/${id}`)
      .then((res) => {
        setConcours(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!concours) return <p className="text-center mt-10">Concours introuvable</p>;

  return (
    <section className="max-w-screen-md mx-auto p-6">
      <Link to="/concours" className="text-red-700 underline mb-4 inline-block">
        ← Retour aux concours
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {concours.affiche && (
          <img
            src={`${api.defaults.baseURL}${concours.affiche}`}
            alt="Affiche concours"
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold text-red-700 mb-2">{concours.titre}</h1>
          <p className="text-gray-600 mb-4">
            📅 {new Date(concours.date).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <p><strong>📍 Lieu :</strong> {concours.lieu}</p>
            <p><strong>🏠 Club :</strong> {concours.club}</p>
            <p><strong>🏆 Type :</strong> {concours.type}</p>
            <p><strong>👥 Catégorie :</strong> {concours.categorie}</p>
          </div>

          {concours.description && (
            <p className="text-gray-800 leading-relaxed border-t pt-4">
              {concours.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConcoursDetails;
