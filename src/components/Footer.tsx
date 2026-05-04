import { VERSION } from "@/version";

interface SourceProps {
  titre: string;
  description: string;
}

function Source({ titre, description }: SourceProps) {
  return (
    <div>
      <p className="font-medium text-gray-700">{titre}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}

const SOURCES: SourceProps[] = [
  {
    titre: "Arboclimat (HDF)",
    description:
      "68 espèces — Données climat, services écosystémiques et résilience. Source : Hauts-de-France.",
  },
  {
    titre: "Sésame (Metz)",
    description:
      "85 espèces — Critères de sélection pour projets urbains. Climat similaire au Nord de la France.",
  },
  {
    titre: "ClimEssences (ONF)",
    description:
      "149 espèces — Adaptation des essences forestières au changement climatique. Source : ONF / CRPF.",
  },
  {
    titre: "Pépinières locales",
    description:
      "Tortefontaine, Haendries, Plant'Haies, Avenir — Disponibilité réelle en Nord France / Benelux.",
  },
  {
    titre: "Végébase",
    description:
      "Base de 197 000+ plantes — Référence pour caractéristiques botaniques et culturales.",
  },
  {
    titre: "Grenoble Métropole",
    description:
      "305 espèces, 31 critères — Données techniques pour l'aménagement urbain.",
  },
];

export default function Footer() {
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
          Arbodex v{VERSION} — Données fournies à titre indicatif. Toujours
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
