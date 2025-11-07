// Importation des hooks React et de la bibliothèque HTTP Axios
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * 🎨 Fonction utilitaire pour déterminer le style visuel selon la fonction
 * Retourne les classes Tailwind CSS appropriées pour chaque rôle
 * @param {string} fonction - La fonction du membre (ex: "Président", "Vice-président")
 * @returns {Object} - Objet contenant les classes CSS pour bordure, texte et fond
 */
const getRoleStyle = (fonction = "") => {
  // Conversion en minuscules pour une comparaison insensible à la casse
  const f = fonction.toLowerCase();

  // Président : style bleu pour marquer l'importance
  if (f.includes("président"))
    return {
      border: "border-blue-500",
      text: "text-blue-700",
      bg: "bg-blue-50",
    };
  
  // Vice-président : style vert pour les adjoints du président
  if (f.includes("vice"))
    return {
      border: "border-green-500",
      text: "text-green-700",
      bg: "bg-green-50",
    };
  
  // Secrétaire : style violet pour la fonction administrative
  if (f.includes("secretaire"))
    return {
      border: "border-purple-500",
      text: "text-purple-700",
      bg: "bg-purple-50",
    };
  
  // Trésorier : style orange pour la fonction financière
  if (f.includes("trésorier") || f.includes("tresorier"))
    return {
      border: "border-orange-500",
      text: "text-orange-700",
      bg: "bg-orange-50",
    };
  
  // Style par défaut pour les autres fonctions
  return {
    border: "border-gray-400",
    text: "text-gray-700",
    bg: "bg-gray-50",
  };
};

/**
 * 🧩 Composant Carte Membre - Affiche les informations d'un membre du comité
 * Composant réutilisable qui génère une carte avec photo, nom et fonction
 * @param {Object} user - Objet contenant les données du membre
 * @param {string} user.photo - URL de la photo (optionnel)
 * @param {string} user.nom - Nom de famille
 * @param {string} user.prenom - Prénom
 * @param {string} user.fonction - Fonction au sein du comité
 */
const NodeCard = ({ user }) => {
  // Récupération du style correspondant à la fonction
  const style = getRoleStyle(user.fonction);

  return (
    <div
      className={`rounded-xl p-2 sm:p-3 md:p-4 text-center w-36 sm:w-44 md:w-52 ${style.bg} border-2 sm:border-3 md:border-4 ${style.border} shadow-md hover:shadow-lg transition-transform hover:-translate-y-1`}
    >
      {/* Photo du membre avec fallback vers image par défaut */}
      <img
        src={user.photo && user.photo !== "null" ? user.photo : "images/homme.png"}
        alt={user.nom}
        className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-full mx-auto mb-1 sm:mb-2 border-2 sm:border-3 md:border-4 ${style.border}`}
      />
      
      {/* Nom complet du membre */}
      <h3 className={`font-semibold text-xs sm:text-sm md:text-base ${style.text}`}>
        {user.prenom} {user.nom}
      </h3>
      
      {/* Fonction officielle */}
      <p className="text-xs sm:text-sm text-gray-600">{user.fonction}</p>
    </div>
  );
};

/**
 * 🌿 Connecteur vertical - Ligne de liaison entre les niveaux hiérarchiques
 * Élément visuel simple qui relie visuellement les niveaux de l'organigramme
 * Responsive : hauteur adaptée selon la taille d'écran
 */
const Connector = () => <div className="w-0.5 sm:w-1 h-6 sm:h-8 md:h-10 bg-green-400 mx-auto"></div>;

/**
 * 📋 Carte Commission - Affiche les détails d'une commission
 * Composant pour présenter une commission avec son responsable et ses membres
 * @param {string} title - Nom de la commission
 * @param {string} responsable - Nom du responsable (optionnel)
 * @param {Array<string>} members - Liste des membres de la commission
 */
const CommissionCard = ({ title, responsable, members }) => (
  <div className="bg-green-50 border border-green-300 rounded-lg p-2 sm:p-3 md:p-4">
    {/* Titre de la commission */}
    <h3 className="font-bold text-green-700 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">{title}</h3>
    
    {/* Responsable (affiché seulement s'il existe) */}
    {responsable && (
      <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">
        Responsable: {responsable}
      </p>
    )}
    
    {/* Liste des membres avec puces */}
    <ul className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1">
      {members.map((member, idx) => (
        <li key={idx}>• {member}</li>
      ))}
    </ul>
  </div>
);

/**
 * 🌳 Composant Arbre récursif - Gère l'affichage hiérarchique des membres
 * Structure l'affichage en niveaux : Secrétaires → Trésoriers → Autres
 * Gère automatiquement les adjoints en les plaçant à côté de leur principal
 * @param {Array} data - Tableau des nœuds à afficher
 */
const Tree = ({ data }) => {
  // Vérification des données d'entrée
  if (!data || data.length === 0) return null;

  // 🔍 Classification des membres par fonction
  // Secrétaires principaux (exclut les adjoints)
  const secretaires = data.filter(node => 
    node.fonction.toLowerCase().includes("secretaire") && 
    !node.fonction.toLowerCase().includes("adjoint")
  );
  
  // Trésoriers principaux (exclut les adjoints)
  const tresoriers = data.filter(node => 
    node.fonction.toLowerCase().includes("tresorier") && 
    !node.fonction.toLowerCase().includes("adjoint")
  );
  
  // Autres membres (ni secrétaires ni trésoriers)
  const autres = data.filter(node => 
    !node.fonction.toLowerCase().includes("secretaire") && 
    !node.fonction.toLowerCase().includes("tresorier")
  );

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8">
      {/* 📝 NIVEAU 1: Secrétaires et leurs adjoints */}
      {secretaires.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
          {secretaires.map((secretaire) => {
            // Récupération des subordonnés directs
            const subs = secretaire.subordinates || [];
            
            // Recherche spécifique du secrétaire adjoint
            const secretaireAdjoint = subs.find((s) =>
              s.fonction.toLowerCase().includes("secretaire adjoint")
            );

            return (
              <div key={secretaire._id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center">
                {/* Secrétaire principal */}
                <NodeCard user={secretaire} />
                
                {/* Secrétaire adjoint (si présent) */}
                {secretaireAdjoint && <NodeCard user={secretaireAdjoint} />}
              </div>
            );
          })}
        </div>
      )}

      {/* 💰 NIVEAU 2: Trésoriers et leurs adjoints */}
      {tresoriers.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
          {tresoriers.map((tresorier) => {
            // Récupération des subordonnés directs
            const subs = tresorier.subordinates || [];
            
            // Recherche spécifique du trésorier adjoint
            const tresorierAdjoint = subs.find((t) =>
              t.fonction.toLowerCase().includes("tresorier adjoint")
            );

            return (
              <div key={tresorier._id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center">
                {/* Trésorier principal */}
                <NodeCard user={tresorier} />
                
                {/* Trésorier adjoint (si présent) */}
                {tresorierAdjoint && <NodeCard user={tresorierAdjoint} />}
              </div>
            );
          })}
        </div>
      )}

      {/* 👥 NIVEAU 3: Autres membres du comité */}
      {autres.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 max-w-sm sm:max-w-4xl md:max-w-6xl mx-auto px-2">
          {autres.map((node) => {
            // Récupération des vrais subordonnés (excluant les adjoints déjà traités)
            const subs = node.subordinates || [];
            const autresSubordonnes = subs.filter(
              (s) =>
                !s.fonction.toLowerCase().includes("secretaire adjoint") &&
                !s.fonction.toLowerCase().includes("tresorier adjoint")
            );

            return (
              <div key={node._id} className="flex flex-col items-center">
                {/* Membre principal */}
                <NodeCard user={node} />
                
                {/* Gestion récursive des sous-niveaux (si existants) */}
                {autresSubordonnes.length > 0 && (
                  <>
                    <Connector />
                    <Tree data={autresSubordonnes} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * 🧠 COMPOSANT PRINCIPAL - Organigramme
 * Gère l'affichage complet de l'organigramme du comité avec:
 * - Chargement des données depuis l'API
 * - Construction de la hiérarchie
 * - Affichage structuré (Président + VP en haut, puis subordonnés)
 * - Section des commissions (collapsible)
 */
const Organigramme = () => {
  // 📊 États de gestion des données
  const [members, setMembers] = useState([]);        // Liste brute des membres
  const [hierarchy, setHierarchy] = useState([]);    // Structure hiérarchique construite
  const [loading, setLoading] = useState(true);      // État de chargement
  const [error, setError] = useState(null);          // Gestion des erreurs
  const [showCommissions, setShowCommissions] = useState(false); // Affichage des commissions

  /**
   * 🔄 CHARGEMENT DES DONNÉES - Récupération depuis l'API backend
   * Filtre automatiquement les membres sans fonction définie
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel API pour récupérer tous les membres
        const res = await axios.get("http://localhost:3000/organigramme/organigramme");
        
        // Filtrage: garde seulement les membres avec une fonction définie
        const valid = res.data.filter((m) => m.fonction && m.fonction.trim() !== "");
        setMembers(valid);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des membres");
      } finally {
        // Fin du chargement dans tous les cas
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Exécution unique au montage du composant

  /**
   * 🧱 CONSTRUCTION DE LA HIÉRARCHIE
   * Utilise le champ 'reportsTo' pour créer l'arbre hiérarchique
   * Algorithme: Map des IDs → Construction parent-enfant
   */
  useEffect(() => {
    if (members.length === 0) return;

    // Création d'une map pour accès rapide par ID
    const map = {};
    members.forEach((m) => (map[m._id] = { ...m, subordinates: [] }));

    // Identification des racines (membres sans supérieur)
    const roots = [];
    members.forEach((m) => {
      if (m.reportsTo && map[m.reportsTo]) {
        // Membre avec supérieur: ajout dans les subordonnés du supérieur
        map[m.reportsTo].subordinates.push(map[m._id]);
      } else {
        // Membre sans supérieur: c'est une racine
        roots.push(map[m._id]);
      }
    });

    setHierarchy(roots);
  }, [members]); // Re-exécution quand les membres changent

  // ⚙️ GESTION DES ÉTATS DE RENDU
  // Affichage pendant le chargement des données
  if (loading)
    return <div className="text-center py-10 text-gray-500">Chargement...</div>;
  
  // Affichage en cas d'erreur de récupération des données
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  
  // Affichage si aucune donnée n'est disponible
  if (hierarchy.length === 0)
    return <div className="text-center py-10 text-gray-600">Aucune donnée</div>;

  // 🔍 SÉPARATION DES RÔLES DE DIRECTION
  // Identification du président (exclut les vice-présidents)
  const president = hierarchy.find(node => 
    node.fonction.toLowerCase().includes("président") && 
    !node.fonction.toLowerCase().includes("vice")
  );
  
  // Récupération de tous les vice-présidents
  const vicePresidents = hierarchy.filter(node => 
    node.fonction.toLowerCase().includes("vice")
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-8 sm:py-12 md:py-16 px-2 sm:px-4">
      {/* 🏷️ Titre principal */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-700 mb-6 sm:mb-8 md:mb-12 px-4">
        Organigramme du Comité
      </h1>

      <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-12">
        {/* Ligne du haut : Vice-présidents + Président + Vice-présidents */}
        {(president || vicePresidents.length > 0) && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-sm sm:max-w-4xl lg:max-w-6xl overflow-x-auto px-2">
            {/* Structure mobile: Président en haut, VP en dessous */}
            <div className="lg:hidden flex flex-col items-center gap-4">
              {/* Président en haut sur mobile */}
              {president && <NodeCard user={president} />}
              
              {/* Vice-présidents en grille sur mobile */}
              {vicePresidents.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {vicePresidents.map((vp) => (
                    <NodeCard key={vp._id} user={vp} />
                  ))}
                </div>
              )}
            </div>

            {/* Structure desktop: ligne horizontale */}
            <div className="hidden lg:flex items-center justify-center gap-4">
              {/* Vice-présidents de gauche */}
              {vicePresidents.slice(0, Math.floor(vicePresidents.length / 2)).map((vp) => (
                <NodeCard key={vp._id} user={vp} />
              ))}
              
              {/* Président au centre */}
              {president && (
                <div className="mx-4 xl:mx-8">
                  <NodeCard user={president} />
                </div>
              )}
              
              {/* Vice-présidents de droite */}
              {vicePresidents.slice(Math.floor(vicePresidents.length / 2)).map((vp) => (
                <NodeCard key={vp._id} user={vp} />
              ))}
            </div>
          </div>
        )}

        {/* Connecteur vers le niveau inférieur */}
        {president && president.subordinates && president.subordinates.length > 0 && (
          <Connector />
        )}

        {/* 🌳 Arborescence des subordonnés */}
        {president && president.subordinates && president.subordinates.length > 0 && (
          <Tree data={president.subordinates} />
        )}
      </div>
       {/* 🔽 Bouton collapse */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10 px-4">
        <button
          onClick={() => setShowCommissions(!showCommissions)}
          className="bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md 
                     hover:bg-green-800 transition duration-300 text-sm sm:text-base"
        >
          {showCommissions ? "Masquer les commissions" : "Voir les commissions"}
        </button>
      </div>

      {/* 🧩 Section commissions animée */}
      <div
        className={`transition-all duration-700 ease-in-out transform ${showCommissions
            ? "opacity-100 translate-y-0 max-h-[2000px] mt-6 sm:mt-8 md:mt-10"
            : "opacity-0 -translate-y-6 max-h-0 overflow-hidden"
          }`}
      >
        <div
          className="bg-white border-2 border-green-700 rounded-xl 
                     shadow-lg p-3 sm:p-4 md:p-6 max-w-sm sm:max-w-4xl md:max-w-6xl mx-auto"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 text-center mb-4 sm:mb-6 md:mb-8">
            Commissions et Référents
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-gray-800">

            {/* Jeunes */}
            <CommissionCard
              title="ETD & GROUPE JEUNES"
              responsable="Régis GYPTEAU"
              members={["Philippe ABADIE", "Hervé BARRE", "Alexandra DEBELLE", "Annie VERDON", "Nathalie PADIOLLEAU"]}
            />
            {/* Féminines */}
            <CommissionCard
              title="GROUPE FEMININ"
              responsable="Annie VERDON"
              members={["Hervé BARRE", "Alexandra DEBELLE", "Jeanny DRAPEAU", "Marie-Claude GYPTEAU", "Nathalie PADIOLLEAU"]}
            />
            {/* Seniors & Vétérans */}
            <CommissionCard
              title="👴 GROUPE SENIORS ET VETERANS"
              responsable="Luc Retureau"
              members={["Hervé BARRE", "Michel BELCOLLIN", "Jeany DRAPEAU", "Annie VERDON"]}
            />
            {/* Arbitrage */}
            <CommissionCard
              title="ARBITRAGE"
              responsable="Jean-Marie Mehouas"
              members={["Olivier BERLAND", "Jacky BELZ", "Jeanny DRAPEAU", "Régis GYPTEAU", "Laurent JOUFFRAIS"]}
            />

            {/* Discipline */}
            <CommissionCard
              title="📣 DISCIPLINE"
              responsable="Annie VERDON"
              members={["Olivier BERLAND", "Jeanny DRAPEAU", "Patrice Guillet"]}
            />
            {/* Coupe de france et cdc */}
            <CommissionCard
              title="COUPE DE FRANCE ET CDC"
              responsable="Hervé BARRE"
              members={["Philippe ABADIE", "Patrice GUILLET", "Luc RETUREAU", "Régis GYPTEAU"]}
            />
            {/* Championnat et Jeu Provençal */}
            <CommissionCard
              title="CHAMPIONNAT PETANQUE JEU PROVENCAL"
              responsable="Annie VERDON"
              members={["Michel BELCOLLIN", "Alexandra DEBELLE", "Laurent JOUFFRAIS", "Luc RETUREAU"]}
            />

            <CommissionCard
              title="COMMISSION CALENDRIER"
              responsable=""
              members={["Jean-Marie MEHOUAS", "Patrice GUILLET", "Luc RETUREAU"]}
            />

            <CommissionCard
              title="COMMISSION FINANCES REGLEMENTS & STATUTS"
              responsable="Jacky DROUET"
              members={["Olivier BERLAND", "Jacky BELZ", "Patrice GUILLET", "Jean-Marie MEHOUAS"]}
            />


          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs sm:text-sm mt-8 sm:mt-10 md:mt-12 px-4">
        © 2024-2028 – Comité Départemental de Pétanque de la Vendée
      </p>
    </div>
  );
};

export default Organigramme;
