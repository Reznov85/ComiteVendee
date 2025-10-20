import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className="backdrop-blur-lg bg-gradient-to-r from-cyan-600 via-blue-800 to-sky-700 
                 fixed w-full z-20 top-0 start-0 border-b border-cyan-400/40 shadow-lg"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* 🏆 LOGO + NOM */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            className="h-20 w-auto rounded-md shadow-md bg-white/10 p-1"
            alt="Logo District"
          />
          <span className="text-2xl font-bold text-white drop-shadow-md hidden sm:block">
            District Pétanque Vendée
          </span>
        </a>

        {/* 📞 BOUTON CONTACT + BURGER */}
        <div className="flex md:order-2 space-x-3">
          <a
            href="#contact"
            className="text-cyan-900 bg-white hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 
                       font-semibold rounded-full text-sm px-5 py-2.5 text-center 
                       shadow-md hover:shadow-lg transition duration-300"
          >
            Contact
          </a>

          {/* 🍔 BURGER MENU MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white 
                       rounded-lg md:hidden hover:bg-cyan-800/40 focus:outline-none focus:ring-2 
                       focus:ring-white transition duration-200"
            aria-controls="navbar-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* 🧭 LIENS NAVIGATION */}
        <div
          id="navbar-menu"
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul
            className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg 
                       md:space-x-8 md:flex-row md:mt-0"
          >
            {/* 🏠 Accueil */}
            <li>
              <a
                href="/"
                className="relative block py-2 px-4 text-white text-lg font-semibold 
                           transition-all duration-300 group 
                           [text-shadow:_0_0_6px_rgba(255,255,255,0.6)] 
                           hover:text-cyan-200 hover:[text-shadow:_0_0_10px_rgba(200,255,255,1)]"
              >
                Accueil
                <span
                  className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-300 
                             transition-all duration-300 group-hover:w-full"
                ></span>
              </a>
            </li>

            {/* 🏆 Le Comité - DROPDOWN */}
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative block py-2 px-4 text-white text-lg font-semibold 
                           transition-all duration-300 group flex items-center gap-1
                           [text-shadow:_0_0_6px_rgba(255,255,255,0.6)] 
                           hover:text-cyan-200 hover:[text-shadow:_0_0_10px_rgba(200,255,255,1)]"
              >
                Le Comité
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 🔽 Sous-menu visible si ouvert */}
              {dropdownOpen && (
                <ul
                  className="absolute left-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg 
                             border border-gray-200 overflow-hidden z-50 md:absolute md:mt-2"
                >
                  <li>
                    <a
                      href="/motpresidente"
                      className="block px-4 py-2 hover:bg-cyan-100"
                    >
                      Le mot de la présidente
                    </a>
                  </li>
                  <li>
                    <a href="/comite" className="block px-4 py-2 hover:bg-cyan-100">
                      Le comité
                    </a>
                  </li>
                  <li>
                    <a href="/organnigramme" className="block px-4 py-2 hover:bg-cyan-100">
                      Organnigramme
                    </a>
                  </li>
                  <li>
                    <a href="/historique" className="block px-4 py-2 hover:bg-cyan-100">
                      Historique du comité
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* 🥇 Compétitions */}
            <li>
              <a
                href="/competitions"
                className="relative block py-2 px-4 text-white text-lg font-semibold 
                           transition-all duration-300 group 
                           [text-shadow:_0_0_6px_rgba(255,255,255,0.6)] 
                           hover:text-cyan-200 hover:[text-shadow:_0_0_10px_rgba(200,255,255,1)]"
              >
                Compétitions
                <span
                  className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-300 
                             transition-all duration-300 group-hover:w-full"
                ></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
