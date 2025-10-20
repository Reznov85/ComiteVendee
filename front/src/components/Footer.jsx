import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-600 via-blue-700 to-sky-800 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10">
        <div className="md:flex md:justify-between md:items-start">
          {/* LOGO + NOM */}
          <div className="mb-8 md:mb-0 flex items-center space-x-3">
            <img
              src="/images/logo.png"
              className="h-12 w-12 rounded-md bg-white/10 p-1 shadow-md"
              alt="Logo"
            />
            <span className="text-2xl font-bold tracking-wide">
              District Pétanque Vendée
            </span>
          </div>

          {/* LIENS */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 text-sm">
            <div>
              <h2 className="mb-3 font-semibold uppercase text-cyan-200">
                Ressources
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    Actualités
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    Clubs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    Compétitions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-semibold uppercase text-cyan-200">
                Nous suivre
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-semibold uppercase text-cyan-200">
                Mentions
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-100 transition">
                    Conditions d’utilisation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* TRAIT DE SÉPARATION */}
        <hr className="my-8 border-cyan-400/30" />

        {/* COPYRIGHT + RESEAUX */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-cyan-100">
            © {new Date().getFullYear()} District Pétanque Vendée. Tous droits
            réservés.
          </span>
          <div className="flex space-x-5 mt-4 sm:mt-0">
            <a
              href="#"
              className="hover:text-cyan-200 transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
            <a
              href="#"
              className="hover:text-cyan-200 transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a
              href="#"
              className="hover:text-cyan-200 transition"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
