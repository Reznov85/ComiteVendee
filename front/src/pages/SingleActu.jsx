import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const SingleActualite = () => {
  const { id } = useParams(); // Récupère l’ID de l’actualité depuis l’URL
  const [actu, setActu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/actualite/${id}`)
      .then((res) => {
        setActu(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement de l’actualité");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!actu)
    return <p className="text-center mt-10">Aucune actualité trouvée.</p>;

  return (
    <>
      <Header />

      {/* ✅ Image principale */}
      <div className="relative w-full overflow-hidden mt-[180px] sm:mt-[200px] md:mt-[220px]">
        {actu.images && actu.images.length > 0 ? (
          <img
            src={`http://localhost:3000${actu.images[0].url}`}
            alt={actu.images[0].description}
            className="w-full h-[70vh] sm:h-[80vh] md:h-[85vh] object-cover object-top"
          />
        ) : (
          <div className="w-full h-[60vh] bg-gray-200 flex items-center justify-center text-gray-500">
            Aucune image disponible
          </div>
        )}
      </div>

      {/* ✅ Contenu de l’article */}
      <section className="max-w-screen-lg mx-auto p-6">
        <h1 className="text-4xl font-bold text-red-700 mb-4">{actu.titre}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Publiée le {new Date(actu.createdAt).toLocaleDateString("fr-FR")}
        </p>

        <article className="text-gray-800 text-lg leading-relaxed mb-10 whitespace-pre-line">
          {actu.contenu}
        </article>

        {/* ✅ Galerie d’images (si plusieurs) */}
        {actu.images && actu.images.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {actu.images.slice(1).map((img) => (
              <img
                key={img._id}
                src={`http://localhost:3000${img.url}`}
                alt={img.description}
                className="rounded-lg shadow-md hover:scale-105 transition duration-300"
              />
            ))}
          </div>
        )}

        {/* ✅ Bouton retour */}
        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-full 
                       font-semibold shadow-md hover:bg-red-700 hover:shadow-lg 
                       transition duration-300"
          >
            ← Retour aux actualités
          </Link>
        </div>
      </section>
    </>
  );
};

export default SingleActualite;
