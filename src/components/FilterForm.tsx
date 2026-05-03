import { Arbre, Filtres } from "@/lib/trees";

interface Props {
  arbres: Arbre[];
  filtres: Filtres;
  onChange: (filtres: Filtres) => void;
}

interface ChampSelect {
  cle: keyof Filtres;
  etiquette: string;
  section: string;
}

const CHAMPS: ChampSelect[] = [
  { cle: "type", etiquette: "Type", section: "Identité & Dimensions" },
  { cle: "type_sol", etiquette: "Type de sol", section: "Sol & Climat" },
  {
    cle: "resistance_secheresse",
    etiquette: "Résistance sécheresse",
    section: "Sol & Climat",
  },
  { cle: "pH", etiquette: "pH préféré", section: "Sol & Climat" },
  {
    cle: "resistance_vent",
    etiquette: "Résistance vent (min)",
    section: "Sol & Climat",
  },
  {
    cle: "resistance_chaleur_urbaine",
    etiquette: "Résistance chaleur urbaine (min)",
    section: "Sol & Climat",
  },
  {
    cle: "adapte_changement_climatique",
    etiquette: "Adapté changement climatique",
    section: "Sol & Climat",
  },
  {
    cle: "mellifere",
    etiquette: "Mellifère",
    section: "Services écosystémiques",
  },
  {
    cle: "fruitiere_sauvage",
    etiquette: "Fruits sauvages",
    section: "Services écosystémiques",
  },
  {
    cle: "floraison_remarquable",
    etiquette: "Floraison remarquable",
    section: "Services écosystémiques",
  },
  {
    cle: "couleur_automnale",
    etiquette: "Couleur automnale",
    section: "Services écosystémiques",
  },
  {
    cle: "pollen_allergisant",
    etiquette: "Pollen allergisant",
    section: "Contraintes",
  },
  {
    cle: "fruits_salissants",
    etiquette: "Fruits salissants",
    section: "Contraintes",
  },
  {
    cle: "branches_fragiles",
    etiquette: "Branches fragiles",
    section: "Contraintes",
  },
  {
    cle: "racines_devastatrices",
    etiquette: "Racines dévastatrices",
    section: "Contraintes",
  },
  {
    cle: "frequence_taille",
    etiquette: "Fréquence taille",
    section: "Maintenance",
  },
  {
    cle: "sensibilite_maladies",
    etiquette: "Sensibilité maladies",
    section: "Maintenance",
  },
  {
    cle: "cout_entretien",
    etiquette: "Coût entretien",
    section: "Maintenance",
  },
];

function optionsUniques(arbres: Arbre[], cle: keyof Arbre): string[] {
  const vals = new Set<string>();
  for (const a of arbres) {
    const v = String(a[cle] ?? "");
    if (v) vals.add(v);
  }
  return [...vals].sort();
}

export default function FormulaireFiltres({
  arbres,
  filtres,
  onChange,
}: Props) {
  const mettreAJour = (cle: keyof Filtres, valeur: string) => {
    onChange({ ...filtres, [cle]: valeur });
  };

  const reinitialiser = () => {
    onChange({
      type: "",
      type_sol: "",
      resistance_secheresse: "",
      pH: "",
      rusticite_min: "",
      rusticite_max: "",
      resistance_vent: "",
      resistance_chaleur_urbaine: "",
      adapte_changement_climatique: "",
      mellifere: "",
      fruitiere_sauvage: "",
      floraison_remarquable: "",
      couleur_automnale: "",
      pollen_allergisant: "",
      fruits_salissants: "",
      branches_fragiles: "",
      racines_devastatrices: "",
      frequence_taille: "",
      sensibilite_maladies: "",
      cout_entretien: "",
      hauteur_min: "",
      hauteur_max: "",
      envergure_min: "",
      envergure_max: "",
    });
  };

  const sections = [...new Set(CHAMPS.map((c) => c.section))];

  const ouiNon = ["oui", "non"];
  const tailles = ["faible", "moderee", "elevee"];
  const frequences = ["jamais", "occasionnelle", "reguliere"];
  const longevites = ["courte", "moyenne", "longue", "tres_longue"];
  const couts = ["faible", "modere", "eleve"];

  function getOptions(cle: keyof Filtres): string[] {
    switch (cle) {
      case "type":
        return optionsUniques(arbres, "type");
      case "type_sol":
        return optionsUniques(arbres, "type_sol");
      case "resistance_secheresse":
        return optionsUniques(arbres, "resistance_secheresse");
      case "pH":
        return optionsUniques(arbres, "pH");
      case "adapte_changement_climatique":
      case "mellifere":
      case "fruitiere_sauvage":
      case "floraison_remarquable":
      case "couleur_automnale":
      case "pollen_allergisant":
      case "fruits_salissants":
      case "branches_fragiles":
      case "racines_devastatrices":
        return ouiNon;
      case "frequence_taille":
        return frequences;
      case "sensibilite_maladies":
        return tailles;
      case "cout_entretien":
        return couts;
      default:
        return [];
    }
  }

  const sectionsFiltres: Record<string, ChampSelect[]> = {};
  for (const champ of CHAMPS) {
    if (!sectionsFiltres[champ.section]) sectionsFiltres[champ.section] = [];
    sectionsFiltres[champ.section].push(champ);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-green-800 mb-4">Filtres</h2>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionsFiltres[section].map(({ cle, etiquette }) => {
                const opts = getOptions(cle);
                const isNumber =
                  cle === "resistance_vent" ||
                  cle === "resistance_chaleur_urbaine";
                return (
                  <div key={cle}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {etiquette}
                    </label>
                    <select
                      value={filtres[cle]}
                      onChange={(e) => mettreAJour(cle, e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Tous</option>
                      {isNumber
                        ? [1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {"≥ ".repeat(n === 1 ? 0 : 0)}
                              {n}/5
                            </option>
                          ))
                        : opts.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Dimensions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hauteur min. (m)
              </label>
              <input
                type="number"
                min={0}
                value={filtres.hauteur_min}
                onChange={(e) => mettreAJour("hauteur_min", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hauteur max. (m)
              </label>
              <input
                type="number"
                min={0}
                value={filtres.hauteur_max}
                onChange={(e) => mettreAJour("hauteur_max", e.target.value)}
                placeholder="50"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Envergure min. (m)
              </label>
              <input
                type="number"
                min={0}
                value={filtres.envergure_min}
                onChange={(e) => mettreAJour("envergure_min", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Envergure max. (m)
              </label>
              <input
                type="number"
                min={0}
                value={filtres.envergure_max}
                onChange={(e) => mettreAJour("envergure_max", e.target.value)}
                placeholder="30"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rusticité min. (°C)
              </label>
              <input
                type="number"
                value={filtres.rusticite_min}
                onChange={(e) => mettreAJour("rusticite_min", e.target.value)}
                placeholder="-40"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rusticité max. (°C)
              </label>
              <input
                type="number"
                value={filtres.rusticite_max}
                onChange={(e) => mettreAJour("rusticite_max", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={reinitialiser}
        className="mt-6 text-sm text-green-700 hover:text-green-900 font-medium"
      >
        Effacer tous les filtres
      </button>
    </div>
  );
}
