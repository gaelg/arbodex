interface SourceProps {
  titre: string;
  description: string;
  url?: string;
}

function Source({ titre, description, url }: SourceProps) {
  return (
    <div>
      <p className="font-medium text-gray-700">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 underline underline-offset-2"
          >
            {titre}
          </a>
        ) : (
          titre
        )}
      </p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}

const SOURCES: SourceProps[] = [
  {
    titre: "WCVP (Kew)",
    description:
      "2 249 espèces — Aire de répartition native (origine). Référence botanique mondiale.",
    url: "https://powo.science.kew.org/",
  },
  {
    titre: "AVEC ADEME",
    description:
      "1 469 espèces — Ombrage, résistance à la sécheresse, stockage carbone. Données climatiques.",
    url: "https://avec.ademe.fr/",
  },
  {
    titre: "PFAF (Plants For A Future)",
    description:
      "700 espèces — Tolérances édaphiques (drainage, richesse), résistance au vent, origine.",
    url: "https://pfaf.org/",
  },
  {
    titre: "Baseflor / CATMINAT",
    description:
      "5 511 espèces — Niveau trophique (richesse du sol), pH, humidité édaphique. Tela Botanica.",
    url: "https://www.tela-botanica.org/projets/phytosociologie",
  },
  {
    titre: "Sésame13 (Cerema)",
    description:
      "241 espèces — Longévité, type racines, vitesse croissance, danger mécanique, allergènes.",
    url: "https://sesame13.cerema.fr/",
  },
  {
    titre: "ARB Arboclimat",
    description:
      "68 espèces — Stockage carbone, qualité air, pollinisation, biodiversité. Hauts-de-France.",
    url: "https://www.arboclimat.org/",
  },
  {
    titre: "Grenoble-Alpes Métropole",
    description:
      "162 espèces — Fruits salissants, écorce décorative, racines, adaptation climatique.",
    url: "https://www.data.gouv.fr/datasets/20250327-test-cra",
  },
];

export default function Footer() {
  const version = process.env.NEXT_PUBLIC_VERSION || "0.2.0";

  return (
    <footer className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Sources de données
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
        {SOURCES.map((s) => (
          <Source key={s.titre} {...s} />
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-xs text-gray-400">
          Arbodex v{version} — Données fournies à titre indicatif. Toujours
          vérifier auprès de votre pépiniériste pour la disponibilité et
          l&apos;adaptation locale.
        </p>
        <a
          href="/mentions-legales"
          className="text-xs text-gray-400 hover:text-green-700 underline"
        >
          Mentions légales
        </a>
      </div>
    </footer>
  );
}
