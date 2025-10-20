import React, { useMemo, useState } from "react";

/* ============================================================
   🗂️ Données de l’organigramme (2024-2028)
   ============================================================ */
const orgData = [
  {
    id: "presidente",
    name: "Marie-Claude Gypteau",
    role: "Présidente",
    photo: "/images/membres/marie-claude.jpg",
    reportsTo: null,
  },
  {
    id: "vice1",
    name: "Jean-Marie Mehouas",
    role: "Vice-Président Délégué",
    photo: "/images/membres/jean-marie.jpg",
    reportsTo: "presidente",
  },
  {
    id: "vice2",
    name: "Patrice Guillet",
    role: "Vice-Président",
    photo: "/images/membres/patrice.jpg",
    reportsTo: "presidente",
  },
  {
    id: "vice3",
    name: "Luc Retureau",
    role: "Vice-Président",
    photo: "/images/membres/luc.jpg",
    reportsTo: "presidente",
  },
  {
    id: "secretaire",
    name: "Philippe Abadie",
    role: "Secrétaire Général",
    photo: "/images/membres/philippe.jpg",
    reportsTo: "presidente",
  },
  {
    id: "secretaireAdj",
    name: "Jeanny Drapeau",
    role: "Secrétaire Adjointe",
    photo: "/images/membres/jeanny.jpg",
    reportsTo: "secretaire",
  },
  {
    id: "tresorier",
    name: "Jacky Drouet",
    role: "Trésorier",
    photo: "/images/membres/jacky.jpg",
    reportsTo: "presidente",
  },
  {
    id: "tresorierAdj",
    name: "Patrice Guillet",
    role: "Trésorier Adjoint",
    photo: "/images/membres/patrice.jpg",
    reportsTo: "tresorier",
  },
  {
    id: "directionSportive",
    name: "Hervé Barre",
    role: "Directeur Sportif",
    photo: "/images/membres/herve.jpg",
    reportsTo: "presidente",
  },
];

/* ============================================================
   ⚙️ Construction hiérarchique
   ============================================================ */
const buildTree = (data) => {
  const map = {};
  data.forEach((item) => (map[item.id] = { ...item, children: [] }));
  const roots = [];
  data.forEach((item) => {
    if (item.reportsTo) {
      map[item.reportsTo]?.children.push(map[item.id]);
    } else {
      roots.push(map[item.id]);
    }
  });
  return roots;
};

/* ============================================================
   🧱 Carte d’un membre
   ============================================================ */
const OrgNode = ({ name, role, photo }) => (
  <div
    className="bg-white border-2 border-green-700 rounded-xl shadow-md text-center 
               p-4 w-52 min-w-[180px] transition hover:shadow-lg hover:scale-105"
  >
    {photo && (
      <img
        src={photo}
        alt={name}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-green-700"
      />
    )}
    <h3 className="text-green-800 font-bold text-lg">{name}</h3>
    <p className="text-gray-700 text-sm">{role}</p>
  </div>
);

/* ============================================================
   🌳 Rendu hiérarchique récursif
   ============================================================ */
const OrgChart = ({ node }) => (
  <div className="flex flex-col items-center">
    <OrgNode name={node.name} role={node.role} photo={node.photo} />

    {node.children?.length > 0 && (
      <>
        <div className="w-0.5 h-6 bg-green-700"></div>

        <div
          className="flex flex-wrap justify-center items-start gap-6 mt-2
                     sm:flex-nowrap sm:flex-row"
        >
          {node.children.map((child) => (
            <div key={child.id} className="flex flex-col items-center">
              <div className="hidden sm:block w-full h-0.5 bg-green-700 mb-2"></div>
              <OrgChart node={child} />
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

/* ============================================================
   🧭 Page principale Organigramme
   ============================================================ */
const Organigramme = () => {
  const tree = useMemo(() => buildTree(orgData), []);
  const [showCommissions, setShowCommissions] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-10">
        Organigramme 2024-2028 – Comité Départemental de Pétanque de la Vendée
      </h1>

      <div className="overflow-x-auto">
        <div className="flex justify-center">
          {tree.map((root) => (
            <OrgChart key={root.id} node={root} />
          ))}
        </div>
      </div>

      {/* 🔽 Bouton collapse */}
      <div className="text-center mt-10">
        <button
          onClick={() => setShowCommissions(!showCommissions)}
          className="bg-green-700 text-white px-6 py-2 rounded-full shadow-md 
                     hover:bg-green-800 transition duration-300"
        >
          {showCommissions ? "Masquer les commissions" : "Voir les commissions"}
        </button>
      </div>

      {/* 🧩 Section commissions animée */}
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          showCommissions
            ? "opacity-100 translate-y-0 max-h-[1500px] mt-10"
            : "opacity-0 -translate-y-6 max-h-0 overflow-hidden"
        }`}
      >
        <div
          className="bg-white border-2 border-green-700 rounded-xl 
                     shadow-lg p-6 max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-green-800 text-center mb-8">
            Commissions et Référents
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-800 text-sm">
            {/* Compétitions */}
            <CommissionCard
              title="🏆 Compétitions"
              responsable="Hervé Barre"
              adjoint="Luc Retureau"
            />
            {/* Jeunes */}
            <CommissionCard
              title="🎯 Jeunes"
              responsable="Luc Retureau"
              adjoint="Jean-Marie Mehouas"
            />
            {/* Féminines */}
            <CommissionCard
              title="👩‍🦰 Féminines"
              responsable="Marie-Claude Gypteau"
              adjoint="Jeanny Drapeau"
            />
            {/* Arbitrage */}
            <CommissionCard
              title="⚖️ Arbitrage"
              responsable="Jean-Marie Mehouas"
              adjoint="Patrice Guillet"
            />
            {/* Technique */}
            <CommissionCard
              title="💻 Technique & Informatique"
              responsable="Patrice Guillet"
              adjoint="Philippe Abadie"
            />
            {/* Seniors & Vétérans */}
            <CommissionCard
              title="👴 Seniors & Vétérans"
              responsable="Luc Retureau"
              adjoint="Hervé Barre"
            />
            {/* Communication */}
            <CommissionCard
              title="📣 Communication"
              responsable="Philippe Abadie"
              adjoint="Marie-Claude Gypteau"
            />
            {/* Évènements */}
            <CommissionCard
              title="📅 Évènements & Calendrier"
              responsable="Jacky Drouet"
              adjoint="Patrice Guillet"
            />
            {/* Discipline */}
            <CommissionCard
              title="⚖️ Discipline & Éthique"
              responsable="Marie-Claude Gypteau"
              adjoint="Philippe Abadie"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-12">
        © 2024-2028 – Comité Départemental de Pétanque de la Vendée
      </p>
    </section>
  );
};

/* ============================================================
   🎯 Composant CommissionCard
   ============================================================ */
const CommissionCard = ({ title, responsable, adjoint }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <h3 className="font-bold text-green-700 text-lg mb-2">{title}</h3>
    <p>
      <strong>Responsable :</strong> {responsable}
    </p>
    <p>
      <strong>Adjoint :</strong> {adjoint}
    </p>
  </div>
);

export default Organigramme;
