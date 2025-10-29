/**
 * 🏗️ COMPOSANT LAYOUT
 * ====================
 * 
 * Ce composant sert de structure de base pour TOUTES les pages du site.
 * Il garantit que chaque page affiche automatiquement :
 * - Le Header (menu de navigation) en haut
 * - Le contenu de la page au centre
 * - Le Footer (pied de page) en bas
 * 
 * 🎯 AVANTAGES :
 * ✅ Évite de répéter le Header et Footer sur chaque page
 * ✅ Assure une mise en page cohérente sur tout le site
 * ✅ Facilite la maintenance (un seul endroit pour modifier la structure)
 * ✅ Gère automatiquement le positionnement sticky du Header
 * 
 * 📦 UTILISATION :
 * Dans App.jsx, on enveloppe toutes les routes avec <Layout>
 * Exemple : <Layout><Routes>...</Routes></Layout>
 */

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Le contenu de la page qui sera affiché entre Header et Footer
 * 
 * Le prop "children" représente tout ce qui est placé entre les balises <Layout>...</Layout>
 * Dans notre cas, c'est le système de Routes avec toutes les pages du site
 */
const Layout = ({ children }) => {
  return (
    // 📐 Conteneur principal avec hauteur minimale de 100vh (viewport height)
    // flex flex-col : disposition verticale (colonne) pour empiler Header, contenu, Footer
    <div className="min-h-screen flex flex-col">
      
      {/* 🧭 HEADER : Menu de navigation sticky en haut de page */}
      <Header />
      
      {/* 📄 MAIN : Zone de contenu principal de la page 
          flex-1 : prend tout l'espace disponible entre Header et Footer
          Cela garantit que le Footer reste toujours en bas, même si le contenu est court */}
      <main className="flex-1">
        {children}  {/* Ici s'affiche le contenu spécifique de chaque page (Home, Actualites, Clubs, etc.) */}
      </main>
      
      {/* 🦶 FOOTER : Pied de page avec informations de contact, liens, etc. */}
      <Footer />
    </div>
  );
};

export default Layout;

/*
🔍 EXPLICATION DÉTAILLÉE DU FONCTIONNEMENT :

1. 📦 STRUCTURE GÉNÉRALE :
   ┌─────────────────────┐
   │      HEADER         │ ← Menu de navigation (toujours visible)
   ├─────────────────────┤
   │                     │
   │      CONTENU        │ ← Page actuelle (Home, Clubs, Actualités...)
   │     (children)      │   S'étire pour prendre tout l'espace disponible
   │                     │
   ├─────────────────────┤
   │      FOOTER         │ ← Pied de page (toujours en bas)
   └─────────────────────┘

2. 🎨 CLASSES TAILWIND UTILISÉES :
   - min-h-screen : hauteur minimale = 100% de la hauteur de l'écran
   - flex : active le mode flexbox pour gérer la disposition
   - flex-col : disposition en colonne (vertical)
   - flex-1 : le <main> prend tout l'espace restant disponible

3. 🔄 PROPS "children" :
   - React passe automatiquement le contenu entre <Layout>...</Layout>
   - Dans App.jsx : <Layout><Routes>...</Routes></Layout>
   - "children" reçoit donc tout le système de routes
   - Chaque page (Home, Clubs, etc.) s'affiche à la place de {children}

4. 🎯 POURQUOI C'EST UTILE ?
   Sans Layout, il faudrait écrire sur CHAQUE page :
   ```jsx
   <Header />
   <div>Mon contenu de page</div>
   <Footer />
   ```
   
   Avec Layout, on écrit juste :
   ```jsx
   <Layout>
     <div>Mon contenu de page</div>
   </Layout>
   ```

5. 💡 EXEMPLE CONCRET :
   Quand l'utilisateur visite "/clubs" :
   - React charge le composant Clubs
   - Layout enveloppe Clubs avec Header et Footer
   - Résultat : Header → Page Clubs → Footer

6. 🛠️ MAINTENANCE :
   Pour changer le Header ou Footer sur TOUT le site :
   - Modifier uniquement Header.jsx ou Footer.jsx
   - TOUTES les pages sont automatiquement mises à jour
   - Pas besoin de toucher aux autres pages individuellement
*/
