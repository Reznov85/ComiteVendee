import React from "react";

const Comite = () => {
  // 🏆 Bureau directeur
  const bureau = [
    { nom: "Marie-Claude Gypteau", role: "Présidente", photo: "/images/membres/marie-claude.jpg" },
    { nom: "Jean-Marie Mehouas", role: "Vice-Président Délégué", photo: "/images/membres/jean-marie.jpg" },
    { nom: "Patrice Guillet", role: "Vice-Président et Trésorier adjoint", photo: "/images/membres/patrice.jpg" },
    { nom: "Luc Retureau", role: "Vice-Président", photo: "/images/membres/luc.jpg" },
    { nom: "Philippe Abadie", role: "Secrétaire Général", photo: "/images/membres/philippe.jpg" },
    { nom: "Jeanny Drapeau", role: "Secrétaire Adjointe", photo: "/images/membres/jeanny.jpg" },
    { nom: "Jacky Drouet", role: "Trésorier Général", photo: "/images/membres/jacky.jpg" },
  ];

  // 🏅 Présidents de district
  const presidentsDistrict = [
    { nom: "Jean-Marie Mehouas", district: "District de Fontenay", photo: "/images/membres/jean-marie.jpg" },
    { nom: "Patrice Guillet", district: "District de La Roche", photo: "/images/membres/patrice.jpg" },
    { nom: "Luc Retureau", district: "District des Sables", photo: "/images/membres/luc.jpg" },
  ];

  // 👥 Conseil d'administration
  const conseil = [
    { nom: "Hervé Barre", photo: "/images/membres/herve.jpg" },
    { nom: "Michel Belcollin", photo: "/images/membres/michel.jpg" },
    { nom: "Olivier Berland", photo: "/images/membres/olivier.jpg" },
    { nom: "Jacky Belz", photo: "/images/membres/jacky-belz.jpg" },
    { nom: "Alexandra Debelle", photo: "/images/membres/alexandra.jpg" },
    { nom: "Régis Gypteau", photo: "/images/membres/regis.jpg" },
    { nom: "Laurent Jouffrais", photo: "/images/membres/laurent.jpg" },
    { nom: "Nathalie Padiolleau", photo: "/images/membres/nathalie.jpg" },
    { nom: "Annie Verdon", photo: "/images/membres/annie.jpg" },
  ];

  return (
    <main className="pt-32 pb-20 bg-gradient-to-b from-blue-900 via-blue-800 to-sky-700 text-white">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        {/* ✅ Titre principal */}
        <h1 className="text-4xl font-extrabold mb-16 drop-shadow-lg">
          Le Comité Départemental de Vendée
        </h1>

        {/* 🏆 Bureau directeur */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-cyan-200 underline decoration-cyan-400/60">
            Bureau Directeur
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bureau.map((membre, index) => (
              <div
                key={`bureau-${index}`}
                className="bg-white/10 border border-white/20 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={membre.photo}
                  alt={membre.nom}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white">{membre.nom}</h3>
                  <p className="text-cyan-300">{membre.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🏅 Présidents de District */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-cyan-200 underline decoration-cyan-400/60">
            Présidents de District
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {presidentsDistrict.map((president, index) => (
              <div
                key={`president-${index}`}
                className="bg-white/10 border border-white/20 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={president.photo}
                  alt={president.nom}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white">{president.nom}</h3>
                  <p className="text-cyan-300">{president.district}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 👥 Conseil d'administration */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-cyan-200 underline decoration-cyan-400/60">
            Conseil d’Administration
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {conseil.map((membre, index) => (
              <div
                key={`conseil-${index}`}
                className="bg-white/10 border border-white/20 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={membre.photo}
                  alt={membre.nom}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{membre.nom}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Comite;
