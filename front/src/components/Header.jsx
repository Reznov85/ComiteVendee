import React, { useState, useEffect } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownComiteOpen, setDropdownComiteOpen] = useState(false);
  const [dropdownCompetOpen, setDropdownCompetOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /** 🔍 Décoder le token JWT depuis le localStorage */
  function decodeToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payloadBase64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload;
    } catch {
      return null;
    }
  }

  // ⚙️ Vérifier connexion au montage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decoded = decodeToken();
      if (decoded) {
        setRole(decoded.role || null);
        setUserName(decoded.nom || decoded.prenom || decoded.email || "Utilisateur");
      }
    }
  }, []);

  // 🚪 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null);
    setUserName(null);
  };

  // 🎛️ Gestion ouverture des dropdowns
  const toggleComite = () => {
    setDropdownComiteOpen(!dropdownComiteOpen);
    setDropdownCompetOpen(false); // ferme l’autre
  };

  const toggleCompet = () => {
    setDropdownCompetOpen(!dropdownCompetOpen);
    setDropdownComiteOpen(false); // ferme l’autre
  };

  return (
    <nav
      className="backdrop-blur-lg bg-gradient-to-r from-cyan-600 via-blue-800 to-sky-700 
                 w-full z-20 top-0 start-0 border-b border-cyan-400/40 shadow-lg"
    >
      <div className="w-full flex items-center justify-between px-4 py-4">
        {/* 🏆 LOGO + NOM */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            className="h-20 w-auto rounded-md shadow-md bg-white/10 p-1"
            alt="Logo District"
          />
          <span className="text-2xl font-bold text-white drop-shadow-md hidden lg:block">
            District Pétanque Vendée
          </span>
        </a>

        {/* 🧭 NAVIGATION CENTRÉE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
          <ul className="flex items-center space-x-6 font-medium">
            <li>
              <a
                href="/"
                className="py-2 px-4 text-white text-lg font-semibold hover:text-cyan-200 transition duration-300"
              >
                Accueil
              </a>
            </li>

            {/* Dropdown Comité */}
            <li className="relative">
              <button
                onClick={toggleComite}
                className="flex items-center gap-1 py-2 px-4 text-white text-lg font-semibold hover:text-cyan-200 transition duration-300"
              >
                Le Comité
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    dropdownComiteOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownComiteOpen && (
                <ul className="absolute left-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 z-50">
                  <li>
                    <a href="/motpresidente" className="block px-4 py-2 hover:bg-cyan-100">
                      Le mot de la présidente
                    </a>
                  </li>
                  <li>
                    <a href="/comite" className="block px-4 py-2 hover:bg-cyan-100">
                      Le comité
                    </a>
                  </li>
                  <li>
                    <a href="/organigramme" className="block px-4 py-2 hover:bg-cyan-100">
                      Organigramme
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Dropdown Compétitions */}
            <li className="relative">
              <button
                onClick={toggleCompet}
                className="flex items-center gap-1 py-2 px-4 text-white text-lg font-semibold hover:text-cyan-200 transition duration-300"
              >
                Compétitions
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    dropdownCompetOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownCompetOpen && (
                <ul className="absolute left-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 z-50">
                  <li>
                    <a href="/concours" className="block px-4 py-2 hover:bg-cyan-100">
                      Calendrier des concours
                    </a>
                  </li>
                  <li>
                    <a href="/championnats" className="block px-4 py-2 hover:bg-cyan-100">
                      Les championnats
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="/actualite" className="py-2 px-4 text-white text-lg font-semibold hover:text-cyan-200 transition duration-300">
                Actualités
              </a>
            </li>
            <li>
              <a href="/clubs" className="py-2 px-4 text-white text-lg font-semibold hover:text-cyan-200 transition duration-300">
                Les Clubs
              </a>
            </li>
          </ul>
        </div>

        {/* 👤 Zone utilisateur */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {isLoggedIn && (
            <div className="flex flex-col text-right mr-3">
              <span className="text-white font-semibold text-sm">Bonjour, {userName}</span>
              {role && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${
                    role === "admin"
                      ? "bg-yellow-400 text-blue-900"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {role.toUpperCase()}
                </span>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-cyan-900 bg-white hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 font-semibold rounded-full text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition duration-300"
            >
              Déconnexion
            </button>
          ) : (
            <a
              href="/login"
              className="text-cyan-900 bg-white hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 font-semibold rounded-full text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition duration-300"
            >
              Connexion
            </a>
          )}

          {/* 🍔 BURGER MENU MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-cyan-800/40 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
            aria-controls="navbar-menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" stroke="currentColor" strokeWidth="2">
              <path d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {/* 📱 MENU MOBILE - Affiché quand menuOpen est true */}
      {menuOpen && (
        <div 
          className="md:hidden bg-gradient-to-b from-cyan-700 to-blue-800 border-t border-cyan-400/40"
          id="navbar-menu"
        >
          <ul className="flex flex-col font-medium p-4 space-y-2">
            <li>
              <a
                href="/"
                className="block py-3 px-4 text-white text-lg font-semibold hover:bg-cyan-600/50 rounded-lg transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                🏠 Accueil
              </a>
            </li>
            
            {/* Section Comité Mobile */}
            <li>
              <div className="text-white text-lg font-semibold py-2 px-4 border-b border-cyan-500/30">
                👥 Le Comité
              </div>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <a
                    href="/motpresidente"
                    className="block py-2 px-4 text-white hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Le mot de la présidente
                  </a>
                </li>
                <li>
                  <a
                    href="/comite"
                    className="block py-2 px-4 text-white hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Le comité
                  </a>
                </li>
                <li>
                  <a
                    href="/organigramme"
                    className="block py-2 px-4 text-white hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Organigramme
                  </a>
                </li>
              </ul>
            </li>

            {/* Section Compétitions Mobile */}
            <li>
              <div className="text-white text-lg font-semibold py-2 px-4 border-b border-cyan-500/30">
                🏆 Compétitions
              </div>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <a
                    href="/concours"
                    className="block py-2 px-4 text-white hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Calendrier des concours
                  </a>
                </li>
                <li>
                  <a
                    href="/championnats"
                    className="block py-2 px-4 text-white hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Les championnats
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="/actualite"
                className="block py-3 px-4 text-white text-lg font-semibold hover:bg-cyan-600/50 rounded-lg transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                📰 Actualités
              </a>
            </li>
            
            <li>
              <a
                href="/clubs"
                className="block py-3 px-4 text-white text-lg font-semibold hover:bg-cyan-600/50 rounded-lg transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                🏟️ Les Clubs
              </a>
            </li>

            {/* Liens Admin (si connecté en tant qu'admin) */}
            {role === "admin" && (
              <>
                <li className="border-t border-cyan-500/30 pt-3 mt-3">
                  <div className="text-yellow-300 text-lg font-semibold py-2 px-4">
                    ⚙️ Administration
                  </div>
                </li>
                <li>
                  <a
                    href="/actualite/new"
                    className="block py-2 px-4 text-yellow-200 hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    ➕ Nouvelle actualité
                  </a>
                </li>
                <li>
                  <a
                    href="/clubs/new"
                    className="block py-2 px-4 text-yellow-200 hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    ➕ Nouveau club
                  </a>
                </li>
                <li>
                  <a
                    href="/concours/new"
                    className="block py-2 px-4 text-yellow-200 hover:bg-cyan-600/50 rounded-lg transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    ➕ Nouveau concours
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
