import { Navigate } from 'react-router-dom';

// 🔒 Composant pour protéger les routes sensibles
const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false }) => {
  // 🔍 Récupération du token depuis localStorage
  const token = localStorage.getItem('token');
  
  // 👤 Fonction pour décoder le token JWT et obtenir les infos utilisateur
  const getUserFromToken = () => {
    if (!token) return null;
    
    try {
      // Décoder la partie payload du JWT (base64)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  };

  const user = getUserFromToken();

  // 🚫 Si l'authentification est requise mais pas de token valide
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // 🛡️ Si les droits admin sont requis mais l'utilisateur n'est pas admin
  if (requireAdmin && (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès refusé</h2>
          <p className="text-gray-600 mb-6">
            Vous n'avez pas les droits nécessaires pour accéder à cette page.
            Seuls les administrateurs peuvent accéder à cette section.
          </p>
          <button 
            onClick={() => Navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // ✅ Si toutes les conditions sont remplies, afficher le composant
  return children;
};

export default ProtectedRoute;