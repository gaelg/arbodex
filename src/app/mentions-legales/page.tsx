export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Mentions légales
      </h1>

      <section className="space-y-6 text-sm text-gray-700">
        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Éditeur du service
          </h2>
          <p>
            Arbodex est un service à but non commercial, développé à titre
            personnel.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Données personnelles
          </h2>
          <p>
            Arbodex ne collecte, ne stocke et ne transmet aucune donnée
            personnelle. L'application fonctionne entièrement côté client
            (navigateur). Aucun cookie de traçage n'est utilisé.
          </p>
          <p className="mt-1">
            Les filtres et recherches sont effectués localement dans votre
            navigateur. Aucune donnée n'est envoyée à un serveur tiers.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Données botaniques
          </h2>
          <p>
            Les données présentées (caractéristiques des essences, critères
            climatiques, etc.) sont fournies à titre indicatif et proviennent de
            sources publiques et professionnelles (voir page d'accueil). Elles
            ne constituent pas un conseil technique professionnel.
          </p>
          <p className="mt-1">
            Il est recommandé de vérifier toute information auprès d'un
            pépiniériste ou d'un bureau d'études avant de prendre des décisions
            de plantation.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">
            Propriété intellectuelle
          </h2>
          <p>
            Le code source d'Arbodex est disponible sous licence libre (voir
            dépôt GitHub). Les données botaniques proviennent de sources tierces
            soumises à leurs propres licences.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">Responsabilité</h2>
          <p>
            L'éditeur d'Arbodex ne saurait être tenu responsable des décisions
            prises sur la base des données fournies par l'application. Les
            informations peuvent contenir des erreurs ou des imprécisions.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-2">Hébergement</h2>
          <p>
            L'application est hébergée par Vercel Inc.
            <br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </p>
        </div>
      </section>
    </div>
  );
}
