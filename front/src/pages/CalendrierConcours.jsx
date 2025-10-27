// 📦 IMPORTS
import React, { useEffect, useState } from "react";
import api from "../api/axios"; // Instance axios centralisée
import FullCalendar from "@fullcalendar/react"; // Composant calendrier principal
import dayGridPlugin from "@fullcalendar/daygrid"; // Plugin pour l'affichage en grille mensuelle
import interactionPlugin from "@fullcalendar/interaction"; // Plugin pour les interactions (clic, etc.)
import { Link } from "react-router-dom"; // Pour la navigation

/**
 * 🗓️ COMPOSANT CalendrierConcours
 * 
 * Affiche un calendrier interactif des concours de pétanque
 * Utilise FullCalendar pour la visualisation et permet de cliquer sur les événements
 */
const CalendrierConcours = () => {
  // 🔄 ÉTAT LOCAL
  const [concours, setConcours] = useState([]); // Stocke la liste des concours récupérés de l'API
  const [userRole, setUserRole] = useState(null); // Stocke le rôle de l'utilisateur connecté

  // � FONCTION DE DÉCODAGE DU TOKEN JWT
  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // Décoder la partie payload du JWT (base64)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  };

  // 🚀 EFFET DE CHARGEMENT
  // S'exécute au montage du composant pour récupérer les données
  useEffect(() => {
    // Récupération du rôle utilisateur
    const role = getUserRole();
    setUserRole(role);

    // Récupération des concours
    api
      .get("/concours/all") // Appel API pour récupérer tous les concours
      .then((res) => setConcours(res.data)) // Stocke les données dans l'état local
      .catch((err) => console.error("Erreur chargement concours:", err)); // Gestion des erreurs
  }, []); // [] = ne s'exécute qu'une seule fois au montage

  // 🎯 TRANSFORMATION DES DONNÉES
  // Convertit les données des concours au format attendu par FullCalendar
  const events = concours.map((c) => ({
    id: c._id, // Identifiant unique du concours
    title: `${c.titre} (${c.type})`, // Titre affiché sur le calendrier
    start: c.date, // Date de début de l'événement
    extendedProps: { // Propriétés supplémentaires accessibles lors du clic
      lieu: c.lieu,
      club: c.club,
      categorie: c.categorie,
      description: c.description,
      affiche: c.affiche,
    },
  }));

  // 🖱️ GESTIONNAIRE DE CLIC SUR UN ÉVÉNEMENT
  // Redirige vers la page de détail du concours sélectionné
  const handleEventClick = (info) => {
    const id = info.event.id; // Récupère l'ID du concours cliqué
    window.location.href = `/concours/${id}`; // Redirection vers la page de détail
  };


  // 🎨 RENDU DU COMPOSANT
  return (
    <section className="max-w-screen-xl mx-auto p-6">
      {/* 📋 TITRE DE LA PAGE */}
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
        Calendrier des concours
      </h2>

      {/* 🗓️ CONTENEUR DU CALENDRIER */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <FullCalendar
          // 🔌 PLUGINS NÉCESSAIRES
          plugins={[dayGridPlugin, interactionPlugin]} // Grille mensuelle + interactions
          
          // 👀 VUE INITIALE
          initialView="dayGridMonth" // Affichage mensuel par défaut
          
          // 🌍 LOCALISATION
          locale="fr" // Interface en français
          
          // 🧭 BARRE D'OUTILS DU HEADER
          headerToolbar={{
            left: "prev,next today", // Boutons: précédent, suivant, aujourd'hui
            center: "title", // Titre du mois/année au centre
            right: "", // Rien à droite (pas de sélecteur de vue)
          }}
          
          // 📅 DONNÉES DES ÉVÉNEMENTS
          events={events} // Liste des concours transformés
          
          // 🖱️ GESTIONNAIRE DE CLIC
          eventClick={handleEventClick} // Fonction appelée lors du clic sur un événement
          
          // 📏 DIMENSIONS
          height="auto" // Hauteur automatique selon le contenu
        />
      </div>

      {/* 🔒 BOUTON ADMIN - Visible uniquement pour les administrateurs */}
      {userRole === 'admin' && (
        <div className="mt-6 text-center">
          <Link 
            to="/concours/new" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un concours
          </Link>
        </div>
      )}
    </section>

  );
};

// 📤 EXPORT DU COMPOSANT
export default CalendrierConcours;

/*
🔍 EXPLICATION GÉNÉRALE DU FONCTIONNEMENT :

1. 📥 CHARGEMENT DES DONNÉES :
   - Au montage du composant, useEffect() fait un appel API
   - Les concours sont récupérés via l'instance axios centralisée (api.get("/concours/all"))
   - Les données sont stockées dans l'état local 'concours'

2. 🔄 TRANSFORMATION :
   - Les données brutes sont transformées au format FullCalendar
   - Chaque concours devient un "event" avec id, title, start, etc.
   - Les propriétés supplémentaires sont stockées dans extendedProps

3. 🖼️ AFFICHAGE :
   - FullCalendar affiche les événements sur un calendrier mensuel
   - Interface en français avec navigation (prev/next/today)
   - Chaque concours apparaît comme un bloc coloré sur sa date

4. 🖱️ INTERACTION :
   - Clic sur un événement → handleEventClick()
   - Redirection vers la page de détail du concours (/concours/:id)
   - Permet de voir plus d'informations sur le concours sélectionné

5. 🎨 STYLING :
   - Utilise Tailwind CSS pour le style
   - Conteneur centré avec ombre et coins arrondis
   - Titre en rouge (couleurs du thème pétanque)

📋 DÉPENDANCES REQUISES :
- @fullcalendar/react
- @fullcalendar/daygrid 
- @fullcalendar/interaction
- axios pour les requêtes HTTP
*/
