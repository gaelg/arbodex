"use client";

import { useState } from "react";
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
  // Essence (plus utilisé)
  { cle: "origine", etiquette: "Origine", section: "L'essence" },

  // Sol & Climat (priorité haute)
  { cle: "type_sol", etiquette: "Type de sol", section: "Sol & Climat" },
  {
    cle: "resistance_secheresse",
    etiquette: "Résistance sécheresse (max)",
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
    etiquette: "Chaleur urbaine (min)",
    section: "Sol & Climat",
  },
  {
    cle: "adapte_changement_climatique",
    etiquette: "Adapté changement climatique",
    section: "Sol & Climat",
  },

  // Services (pour clients)
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

  // Contraintes (alertes)
  {
    cle: "pollen_allergisant",
    etiquette: "Pollen allergisant (max)",
    section: "Contraintes & Risques",
  },
  {
    cle: "fruits_salissants",
    etiquette: "Fruits salissants",
    section: "Contraintes & Risques",
  },
  {
    cle: "branches_fragiles",
    etiquette: "Branches fragiles",
    section: "Contraintes & Risques",
  },
  {
    cle: "racines_devastatrices",
    etiquette: "Racines dévastatrices",
    section: "Contraintes & Risques",
  },

  // Maintenance (coût)
  {
    cle: "frequence_taille",
    etiquette: "Fréquence taille (max)",
    section: "Entretien",
  },
  {
    cle: "sensibilite_maladies",
    etiquette: "Sensibilité maladies (max)",
    section: "Entretien",
  },
  {
    cle: "cout_entretien",
    etiquette: "Coût entretien (max)",
    section: "Entretien",
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
  const sections = [...new Set(CHAMPS.map((c) => c.section))];

  const [sectionsOuvertes, setSectionsOuvertes] = useState<
    Record<string, boolean>
  >({
    "Sol & Climat": true,
    "Services \u00e9cosyst\u00e9miques": false,
    Contraintes: false,
    Maintenance: false,
  });

  const toggleSection = (section: string) => {
    setSectionsOuvertes((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const mettreAJour = (cle: keyof Filtres, valeur: string) => {
    onChange({ ...filtres, [cle]: valeur });
    if (cle === "recherche" && valeur) {
      const toutesFermees: Record<string, boolean> = {};
      for (const s of sections) toutesFermees[s] = false;
      setSectionsOuvertes(toutesFermees);
    }
  };

  const reinitialiser = () => {
    onChange({
      recherche: "",
      type: "",
      origine: "",
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

  const ouiNon = ["oui", "non"];
  const frequences = ["jamais", "occasionnelle", "reguliere"];
  const tailles = ["faible", "moderee", "elevee"];
  const couts = ["faible", "modere", "eleve"];

  const formatOption = (opt: string) =>
    opt.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  function getOptions(cle: keyof Filtres): string[] {
    switch (cle) {
      case "origine":
        return ["local", "presque_local", "vraiment_exotique"];
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
      case "fruits_salissants":
      case "branches_fragiles":
      case "racines_devastatrices":
        return ouiNon;
      case "pollen_allergisant":
        return ["faible", "moyen"]; // "fort" excluded - pros want max tolerance
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
      {/* Barre de recherche */}
      <div className="mb-4">
        <label
          htmlFor="recherche"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rechercher une essence
        </label>
        <input
          id="recherche"
          type="text"
          value={filtres.recherche}
          onChange={(e) => mettreAJour("recherche", e.target.value)}
          placeholder="Ex: Chêne, Érable, Buis..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <h2 className="text-lg font-semibold text-green-800 mb-4">Filtres</h2>

      <div className="space-y-2">
        {sections.map((section) => {
          const ouvert = sectionsOuvertes[section] ?? false;
          return (
            <div
              key={section}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
              >
                <h3 className="text-sm font-semibold text-gray-700">
                  {section}
                </h3>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${ouvert ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {ouvert && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionsFiltres[section].map(({ cle, etiquette }) => {
                    const opts = getOptions(cle);
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
                          {opts.map((opt) => (
                            <option key={opt} value={opt}>
                              {formatOption(opt)}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Dimensions - toujours visible */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("Dimensions")}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
          >
            <h3 className="text-sm font-semibold text-gray-700">Dimensions</h3>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${sectionsOuvertes["Dimensions"] ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {sectionsOuvertes["Dimensions"] && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    H. min (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.hauteur_min}
                    onChange={(e) => mettreAJour("hauteur_min", e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    H. max (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.hauteur_max}
                    onChange={(e) => mettreAJour("hauteur_max", e.target.value)}
                    placeholder="50"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    E. min (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.envergure_min}
                    onChange={(e) =>
                      mettreAJour("envergure_min", e.target.value)
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    E. max (m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filtres.envergure_max}
                    onChange={(e) =>
                      mettreAJour("envergure_max", e.target.value)
                    }
                    placeholder="30"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Rusticit\u00e9 min (\u00b0C)
                  </label>
                  <input
                    type="number"
                    value={filtres.rusticite_min}
                    onChange={(e) =>
                      mettreAJour("rusticite_min", e.target.value)
                    }
                    placeholder="-40"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Rusticit\u00e9 max (\u00b0C)
                  </label>
                  <input
                    type="number"
                    value={filtres.rusticite_max}
                    onChange={(e) =>
                      mettreAJour("rusticite_max", e.target.value)
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={reinitialiser}
        className="mt-4 text-sm text-green-700 hover:text-green-900 font-medium"
      >
        Effacer tous les filtres
      </button>
    </div>
  );
}
