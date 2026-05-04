import { FilterConfig } from "./types";

export const FILTERS: FilterConfig[] = [
  // Essence
  {
    key: "origine",
    label: "Origine",
    section: "Essence",
    type: "exact",
    options: ["local", "presque_local", "vraiment_exotique"],
  },

  // Sol
  {
    key: "type_sol",
    label: "Type de sol",
    section: "Sol",
    type: "partial",
  },
  {
    key: "pH",
    label: "pH",
    section: "Sol",
    type: "exact",
  },

  // Climat
  {
    key: "resistance_secheresse",
    label: "Résistance sécheresse",
    section: "Climat",
    type: "relative",
    order: { faible: 1, moyenne: 2, bonne: 3, excellente: 4 },
  },
  {
    key: "resistance_vent",
    label: "Résistance vent",
    section: "Climat",
    type: "numeric",
  },
  {
    key: "resistance_chaleur_urbaine",
    label: "Chaleur urbaine",
    section: "Climat",
    type: "numeric",
  },
  {
    key: "adapte_changement_climatique",
    label: "Adapté changement climatique",
    section: "Climat",
    type: "exact",
  },

  // Services écosystémiques
  {
    key: "mellifere",
    label: "Mellifère",
    section: "Services écosystémiques",
    type: "exact",
  },
  {
    key: "ombrage_fort",
    label: "Ombrage",
    section: "Services écosystémiques",
    type: "exact",
  },
  {
    key: "rafraichissement_fort",
    label: "Rafraîchissement",
    section: "Services écosystémiques",
    type: "exact",
  },

  // Caractéristiques
  {
    key: "fruitiere_sauvage",
    label: "Fruits sauvages",
    section: "Caractéristiques",
    type: "exact",
  },
  {
    key: "floraison_remarquable",
    label: "Floraison remarquable",
    section: "Caractéristiques",
    type: "exact",
  },
  {
    key: "couleur_automnale",
    label: "Couleur automnale",
    section: "Caractéristiques",
    type: "exact",
  },

  // Contraintes & Risques
  {
    key: "pollen_allergisant",
    label: "Pollen allergisant (max)",
    section: "Contraintes & Risques",
    type: "relative",
    order: { faible: 1, moyen: 2, fort: 3 },
  },
  {
    key: "fruits_salissants",
    label: "Fruits salissants",
    section: "Contraintes & Risques",
    type: "exact",
  },
  {
    key: "branches_fragiles",
    label: "Branches fragiles",
    section: "Contraintes & Risques",
    type: "exact",
  },
  {
    key: "racines_devastatrices",
    label: "Racines dévastatrices",
    section: "Contraintes & Risques",
    type: "exact",
  },

  // Entretien
  {
    key: "frequence_taille",
    label: "Fréquence taille (max)",
    section: "Entretien",
    type: "relative",
    order: { jamais: 1, occasionnelle: 2, reguliere: 3 },
  },
  {
    key: "sensibilite_maladies",
    label: "Sensibilité maladies (max)",
    section: "Entretien",
    type: "relative",
    order: { faible: 1, moderee: 2, elevee: 3 },
  },
  {
    key: "cout_entretien",
    label: "Coût entretien (max)",
    section: "Entretien",
    type: "relative",
    order: { faible: 1, modere: 2, eleve: 3 },
  },
];

// Helpers pour récupérer les infos
export function getFilterByKey(key: string): FilterConfig | undefined {
  return FILTERS.find((f) => f.key === key);
}

export function getFiltersBySection(): Record<string, FilterConfig[]> {
  const sections: Record<string, FilterConfig[]> = {};
  for (const f of FILTERS) {
    if (!sections[f.section]) sections[f.section] = [];
    sections[f.section].push(f);
  }
  return sections;
}

export function getAllSections(): string[] {
  return [...new Set(FILTERS.map((f) => f.section))];
}

export function getDefaultFiltersState(): Record<string, string> {
  const state: Record<string, string> = { recherche: "" };
  for (const f of FILTERS) {
    state[f.key] = "";
  }
  // Ajouter les filtres de dimension (pas dans le registre central)
  state.hauteur_min = "";
  state.hauteur_max = "";
  state.envergure_min = "";
  state.envergure_max = "";
  state.rusticite_min = "";
  state.rusticite_max = "";
  return state;
}
