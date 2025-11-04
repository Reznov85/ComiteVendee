import React from "react";

const Comite = () => {
  // 🏆 Bureau directeur
  const bureau = [
    { nom: "Marie-Claude Gypteau", role: "Présidente", photo: "/images/femme.png" },
    { nom: "Jean-Marie Mehouas", role: "Vice-Président Délégué", photo: "/images/homme.png" },
    { nom: "Patrice Guillet", role: "Vice-Président et Trésorier adjoint", photo: "/images/homme.png" },
    { nom: "Luc Retureau", role: "Vice-Président", photo: "/images/homme.png" },
    { nom: "Philippe Abadie", role: "Secrétaire Général", photo: "/images/homme.png" },
    { nom: "Jeanny Drapeau", role: "Secrétaire Adjointe", photo: "/images/femme.png" },
    { nom: "Jacky Drouet", role: "Trésorier Général", photo: "/images/homme.png" },
  ];

  // 🏅 Présidents de district
  const presidentsDistrict = [
    { nom: "Jean-Marie Mehouas", district: "District de Fontenay", photo: "/images/homme.png" },
    { nom: "Patrice Guillet", district: "District de La Roche", photo: "/images/homme.png" },
    { nom: "Luc Retureau", district: "District des Sables", photo: "/images/homme.png" },
  ];


  const conseil = [
    { nom: "Hervé Barre", photo: "/images/homme.png" },
    { nom: "Michel Belcollin", photo: "/images/homme.png" },
    { nom: "Olivier Berland", photo: "/images/homme.png" },
    { nom: "Jacky Belz", photo: "/images/homme.png" },
    { nom: "Alexandra Debelle", photo: "/images/femme.png" },
    { nom: "Régis Gypteau", photo: "/images/homme.png" },
    { nom: "Laurent Jouffrais", photo: "/images/homme.png" },
    { nom: "Nathalie Padiolleau", photo: "/images/femme.png" },
    { nom: "Annie Verdon", photo: "/images/femme.png" },
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
                  className="w-full h-48 object-contain object-center bg-white/5"
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
                  className="w-full h-48 object-contain object-center bg-white/5"
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
                  className="w-full h-48 object-contain object-center bg-white/5"
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
