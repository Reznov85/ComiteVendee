import React, { useEffect, useState } from "react";
import axios from "axios";

const OrgannigrammeSimple = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🚀 Démarrage du composant OrgannigrammeSimple");
    
    axios
      .get("http://localhost:3000/organigramme/organigramme")
      .then((res) => {
        console.log("✅ Données reçues:", res.data);
        console.log("📊 Nombre d'éléments:", res.data?.length);
        console.log("📊 Type:", typeof res.data);
        
        setData(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Erreur:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Erreur: {error}</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-green-600">
        Organigramme du Comité - Version Simple
      </h1>

      <div className="mb-6 p-4 bg-blue-100 rounded">
        <h2 className="font-bold text-blue-800">Informations Debug:</h2>
        <p>Nombre total de membres: {data.length}</p>
        <p>Type de données: {typeof data}</p>
        <p>Est un tableau: {Array.isArray(data) ? "Oui" : "Non"}</p>
      </div>

      {data.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Liste des membres:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((member, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow">
                <div className="text-center">
                  <img
                    src={member.photo || "images/homme.png"}
                    alt={`${member.prenom} ${member.nom}`}
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-2 border-green-400"
                  />
                  <h3 className="font-bold text-lg text-green-700">
                    {member.prenom} {member.nom}
                  </h3>
                  <p className="text-sm text-gray-600 bg-green-50 px-2 py-1 rounded mt-1">
                    {member.fonction || member.role || "Membre"}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    <p>ID: {member._id}</p>
                    <p>Fonction: {member.fonction || "Aucune"}</p>
                    <p>Rôle: {member.role || "Aucun"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section spéciale pour les paires */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Paires côte à côte:</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {(() => {
                const processed = new Set();
                const pairs = [];

                data.forEach(member => {
                  if (processed.has(member._id)) return;
                  
                  const memberRole = (member.fonction || member.role || "").toLowerCase();
                  let adjoint = null;

                  // Chercher le secrétaire adjoint
                  if (memberRole.includes("secretaire") && !memberRole.includes("adjoint")) {
                    adjoint = data.find(d => 
                      !processed.has(d._id) && 
                      d._id !== member._id &&
                      (d.fonction || d.role || "").toLowerCase().includes("secretaire") &&
                      (d.fonction || d.role || "").toLowerCase().includes("adjoint")
                    );
                  }

                  // Chercher le trésorier adjoint
                  if (memberRole.includes("tresorier") && !memberRole.includes("adjoint")) {
                    adjoint = data.find(d => 
                      !processed.has(d._id) && 
                      d._id !== member._id &&
                      (d.fonction || d.role || "").toLowerCase().includes("tresorier") &&
                      (d.fonction || d.role || "").toLowerCase().includes("adjoint")
                    );
                  }

                  if (adjoint) {
                    pairs.push([member, adjoint]);
                    processed.add(member._id);
                    processed.add(adjoint._id);
                  } else if (!memberRole.includes("adjoint")) {
                    pairs.push([member]);
                    processed.add(member._id);
                  }
                });

                return pairs.map((pair, index) => (
                  <div key={`pair-${index}`} className="flex items-center gap-4">
                    {pair.map((person, personIndex) => (
                      <div key={person._id} className="relative">
                        <div className="border border-gray-300 rounded-lg p-4 bg-white shadow">
                          <div className="text-center">
                            <img
                              src={person.photo || "images/homme.png"}
                              alt={`${person.prenom} ${person.nom}`}
                              className="w-16 h-16 rounded-full mx-auto mb-2 object-cover border-2 border-green-400"
                            />
                            <h4 className="font-bold text-green-700">
                              {person.prenom} {person.nom}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {person.fonction || person.role || "Membre"}
                            </p>
                          </div>
                        </div>
                        {pair.length === 2 && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            {personIndex === 0 ? "Principal" : "Adjoint"}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {pair.length === 2 && (
                      <div className="w-8 h-0.5 bg-green-400 rounded-full relative">
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucune donnée trouvée</p>
      )}
    </div>
  );
};

export default OrgannigrammeSimple;