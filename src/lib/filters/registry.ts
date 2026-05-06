import { FilterConfig } from "./types";

export const FILTERS: FilterConfig[] = [
  // Sol
  {
    key: "sol_acidity",
    label: "Acidité",
    section: "Sol",
    type: "multi",
    options: ["all", "acid", "neutral", "alkaline"],
    optionLabels: {
      all: "Tous",
      acid: "Acide",
      neutral: "Neutre",
      alkaline: "Calcaire",
    },
  },
  {
    key: "sol_moisture",
    label: "Humidité",
    section: "Sol",
    type: "multi",
    options: ["all", "dry", "fresh", "wet"],
    optionLabels: {
      all: "Tous",
      dry: "Sec",
      fresh: "Frais",
      wet: "Humide",
    },
  },
  {
    key: "sol_drainage",
    label: "Drainage",
    section: "Sol",
    type: "multi",
    options: ["all", "good", "medium", "poor"],
    optionLabels: {
      all: "Tous",
      good: "Bon",
      medium: "Moyen",
      poor: "Mauvais",
    },
  },
  {
    key: "sol_texture",
    label: "Texture",
    section: "Sol",
    type: "multi",
    options: ["all", "loamy", "clay", "sandy"],
    optionLabels: {
      all: "Tous",
      loamy: "Limoneux",
      clay: "Argileux",
      sandy: "Sablonneux",
    },
  },
  {
    key: "sol_richness",
    label: "Richesse",
    section: "Sol",
    type: "multi",
    options: ["all", "humus", "medium", "poor"],
    optionLabels: {
      all: "Tous",
      humus: "Humifère",
      medium: "Moyen",
      poor: "Pauvre",
    },
  },
  {
    key: "sol_depth",
    label: "Profondeur",
    section: "Sol",
    type: "exact",
    options: ["all", "shallow"],
    optionLabels: {
      all: "Tous",
      shallow: "Peu profond",
    },
  },

  // Climat
  {
    key: "adapte_changement_climatique",
    label: "Adapté changement climatique",
    section: "Climat",
    type: "exact",
    options: ["all", "yes"],
    optionLabels: {
      all: "Tous",
      yes: "Oui",
    },
  },
  {
    key: "resistance_secheresse",
    label: "Résistance sécheresse (mini)",
    section: "Climat",
    type: "relative",
    order: { low: 1, medium: 2, good: 3, excellent: 4 },
    options: ["all", "low", "medium", "good", "excellent"],
    optionLabels: {
      all: "Tous",
      low: "Faible",
      medium: "Moyenne",
      good: "Bonne",
      excellent: "Excellente",
    },
  },
  {
    key: "resistance_vent",
    label: "Résistance vent (mini)",
    section: "Climat",
    type: "relative",
    order: { low: 1, medium: 2, good: 3, excellent: 4 },
    options: ["all", "low", "medium", "good", "excellent"],
    optionLabels: {
      all: "Tous",
      low: "Faible",
      medium: "Moyenne",
      good: "Bonne",
      excellent: "Excellente",
    },
  },
  {
    key: "resistance_chaleur_urbaine",
    label: "Résistance chaleur urbaine (mini)",
    section: "Climat",
    type: "relative",
    order: { low: 1, medium: 2, good: 3, excellent: 4 },
    options: ["all", "low", "medium", "good", "excellent"],
    optionLabels: {
      all: "Tous",
      low: "Faible",
      medium: "Moyenne",
      good: "Bonne",
      excellent: "Excellente",
    },
  },
  {
    key: "rusticite_min_C",
    label: "Rusticité minimale (°C)",
    section: "Climat",
    type: "numeric",
  },

  // Services
  {
    key: "origine",
    label: "Origine",
    section: "Services",
    type: "exact",
    options: ["all", "west_europe", "native"],
    optionLabels: {
      all: "Tous",
      west_europe: "Europe de l'Ouest",
      native: "Indigène",
    },
  },
  {
    key: "mellifere",
    label: "Mellifère",
    section: "Services",
    type: "exact",
    options: ["all", "yes"],
    optionLabels: {
      all: "Tous",
      yes: "Oui",
    },
  },
  {
    key: "ombrage_fort",
    label: "Ombrage",
    section: "Services",
    type: "exact",
    options: ["all", "yes"],
    optionLabels: {
      all: "Tous",
      yes: "Oui",
    },
  },
  {
    key: "rafraichissement_fort",
    label: "Rafraîchissement minimal",
    section: "Services",
    type: "relative",
    order: { medium: 2, strong: 3 },
    options: ["all", "medium", "strong"],
    optionLabels: {
      all: "Tous",
      medium: "Moyen",
      strong: "Fort",
    },
  },
  {
    key: "fruitiere_sauvage",
    label: "Fruits pour la faune",
    section: "Services",
    type: "exact",
    options: ["all", "yes"],
    optionLabels: {
      all: "Tous",
      yes: "Oui",
    },
  },

  // Esthétique
  {
    key: "floraison_remarquable",
    label: "Floraison remarquable",
    section: "Esthétique",
    type: "exact",
    options: ["all", "yes"],
    optionLabels: {
      all: "Tous",
      yes: "Oui",
    },
  },
  {
    key: "couleur_automnale",
    label: "Couleur automnale",
    section: "Esthétique",
    type: "exact",
    options: ["all", "yes"],
    optionLabels: {
      all: "Tous",
      yes: "Oui",
    },
  },

  // Contraintes et risques
  {
    key: "pollen_allergisant",
    label: "Allergisant (maxi)",
    section: "Contraintes et risques",
    type: "relative",
    order: { low: 1, medium: 2 },
    options: ["all", "low", "medium"],
    optionLabels: {
      all: "Tous",
      low: "Faiblement",
      medium: "Moyennement",
    },
  },
  {
    key: "fruits_salissants",
    label: "Fruits salissants",
    section: "Contraintes et risques",
    type: "exact",
    options: ["all", "no"],
    optionLabels: {
      all: "Tous",
      no: "Non",
    },
  },
  {
    key: "branches_fragiles",
    label: "Branches fragiles",
    section: "Contraintes et risques",
    type: "exact",
    options: ["all", "no"],
    optionLabels: {
      all: "Tous",
      no: "Non",
    },
  },
  {
    key: "racines_devastatrices",
    label: "Racines problématiques",
    section: "Contraintes et risques",
    type: "exact",
    options: ["all", "no"],
    optionLabels: {
      all: "Tous",
      no: "Non",
    },
  },

  // Entretien
  {
    key: "cout_entretien",
    label: "Coût entretien (maxi)",
    section: "Entretien",
    type: "relative",
    order: { low: 1, medium: 2 },
    options: ["all", "low", "medium"],
    optionLabels: {
      all: "Tous",
      low: "Faible",
      medium: "Moyen",
    },
  },
  {
    key: "frequence_taille",
    label: "Fréquence taille (maxi)",
    section: "Entretien",
    type: "relative",
    order: { never: 1, occasional: 2 },
    options: ["all", "never", "occasional"],
    optionLabels: {
      all: "Tous",
      never: "Jamais",
      occasional: "Occasionnelle",
    },
  },
  {
    key: "sensibilite_maladies",
    label: "Sensible aux maladies (maxi)",
    section: "Entretien",
    type: "relative",
    order: { low: 1, medium: 2 },
    options: ["all", "low", "medium"],
    optionLabels: {
      all: "Tous",
      low: "Faiblement",
      medium: "Moyennement",
    },
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
