export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Mentions l{"\u00e9"}gales
      </h1>

      <section className="space-y-6 text-sm text-gray-700">
        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            {"\u00c9"}diteur du service
          </h2>
          <p>
            Arbodex est un service {"\u00e0"} but non commercial, d{"\u00e9"}
            velopp{"\u00e9"} {"\u00e0"} titre personnel.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Donn{"\u00e9"}es personnelles
          </h2>
          <p>
            Arbodex ne collecte, ne stocke et ne transmet aucune donn{"\u00e9"}e
            personnelle. L{"\u0027"}application fonctionne enti{"\u00e8"}rement
            c{"\u00f4"}t{"\u00e9"} client (navigateur). Aucun cookie de tra
            {"\u00e7"}age n{"\u0027"}est utilis{"\u00e9"}.
          </p>
          <p className="mt-1">
            Les filtres et recherches sont effectuées localement dans
            votre navigateur. Aucune donn{"\u00e9"}e n{"\u0027"}est envoy
            {"\u00e9"}e {"\u00e0"} un serveur tiers.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Donn{"\u00e9"}es botaniques
          </h2>
          <p>
            Les donn{"\u00e9"}es pr{"\u00e9"}sent{"\u00e9"}es (caract{"\u00e9"}
            ristiques des essences, crit{"\u00e8"}res climatiques, etc.) sont
            fournies {"\u00e0"} titre indicatif et proviennent de sources
            publiques et professionnelles (voir page d{"\u0027"}accueil). Elles
            ne constituent pas un conseil technique professionnel.
          </p>
          <p className="mt-1">
            Il est recommand{"\u00e9"} de v{"\u00e9"}rifier toute information
            aupr{"\u00e8"}s d{"\u0027"}un p{"\u00e9"}pini{"\u00e8"}riste ou d
            {"\u0027"}un bureau d{"\u0027"}
            {"\u00e9"}tudes avant de prendre des d{"\u00e9"}cisions de
            plantation.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Propri{"\u00e9"}t{"\u00e9"} intellectuelle
          </h2>
          <p>
            Le code source d{"\u0027"}Arbodex est disponible sous licence libre
            (voir d{"\u00e9"}p{"\u00f4"}t GitHub). Les donn{"\u00e9"}es
            botaniques proviennent de sources tierces soumises {"\u00e0"} leurs
            propres licences.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Responsabilit{"\u00e9"}
          </h2>
          <p>
            L{"\u0027"}
            {"\u00e9"}diteur d{"\u0027"}Arbodex ne saurait {"\u00eatre"}
            tenu responsable des d{"\u00e9"}cisions prises sur la base des donn
            {"\u00e9"}es fournies par l{"\u0027"}application. Les informations
            peuvent contenir des erreurs ou des impr{"\u00e9"}
            cisions.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            H{"\u00e9"}bergement
          </h2>
          <p>
            L{"\u0027"}application est h{"\u00e9"}berg{"\u00e9"}e par Vercel
            Inc.
            <br />
            340 S Lemon Ave #4133, Walnut, CA 91789, {"\u00c9"}tats-Unis.
          </p>
        </div>
      </section>
    </div>
  );
}
