import React from "react";

const MotPresidente = () => {
  return (
    <>
      {/* SECTION BANNIÈRE */}
      <section className="relative w-full overflow-hidden">
        {/* ✅ Image bannière responsive */}
        <img
          src="/images/banniere_mot.png"
          alt="Bannière Le mot de la Présidente - Passage du Gois"
          className="w-full h-[15vh] sm:h-[25vh] md:h-[35vh] lg:h-[45vh] object-cover object-center"
        />

        {/* ✅ Dégradé + texte superposé */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-800/40 to-transparent flex items-center justify-center">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg text-center">
            Le mot de la présidente
          </h2>
        </div>
      </section>

      {/* SECTION CONTENU */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* ✅ Portrait */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/images/membres/marie-claude.jpg"
            alt="Mme Claude Gypteau - Présidente"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-lg border-4 border-blue-200"
          />
          <p className="mt-4 text-lg font-semibold text-gray-800">
            Mme Claude Gypteau
          </p>
          <p className="text-sm text-gray-600">Présidente du Comité Départemental de la Vendée</p>
        </div>

        {/* ✅ Texte du mot */}
        <div className="text-gray-800 leading-relaxed text-justify space-y-4 bg-white/70 p-6 rounded-2xl shadow-lg">
          <p>
            Chers licenciés, dirigeants, arbitres et amis boulistes,
          </p>

          <p>
            C’est avec un grand plaisir que je vous adresse ce message au nom du
            Comité Départemental de Pétanque et Jeu Provençal de la Vendée.
            Ensemble, nous partageons la passion de ce sport qui allie
            convivialité, précision et esprit d’équipe.
          </p>

          <p>
            Notre département peut être fier de la vitalité de ses clubs et de
            l’implication de ses bénévoles. Grâce à vous tous, les compétitions,
            les formations et les initiatives locales continuent de faire vivre
            la pétanque vendéenne sur l’ensemble du territoire.
          </p>

          <p>
            Je tiens à remercier chaleureusement les présidents de clubs, les
            éducateurs, les arbitres, ainsi que tous ceux qui œuvrent au
            quotidien pour promouvoir notre sport dans le respect, la bonne
            humeur et le fair-play.
          </p>

          <p>
            Continuons ensemble à faire rayonner la pétanque en Vendée, à
            encourager les jeunes et à préserver les valeurs qui font la force
            de notre discipline.
          </p>

          <p className="mt-6 text-right font-semibold">
            Sportivement,<br />
            <span className="text-blue-800">Claude Gypteau</span><br />
            Présidente du Comité Départemental de la Vendée
          </p>
        </div>
      </section>
    </>
  );
};

export default MotPresidente;
