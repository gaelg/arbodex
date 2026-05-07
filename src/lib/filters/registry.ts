import { FilterConfig } from "./types";

export const FILTERS: FilterConfig[] = [
  // Sols
  {
    key: "sol_acidity",
    label: "Acidité",
    section: "Sols",
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
    section: "Sols",
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
    section: "Sols",
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
    section: "Sols",
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
    section: "Sols",
    type: "multi",
    options: ["all", "humus", "medium", "poor"],
    optionLabels: {
      all: "Tous",
      humus: "Humifère",
      medium: "Moyenne",
      poor: "Pauvre",
    },
  },
  {
    key: "sol_depth",
    label: "Profondeur",
    section: "Sols",
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
    options: ["all", "oui"],
    optionLabels: {
      all: "Pas spécialement",
      oui: "Oui",
    },
  },
  {
    key: "resistance_secheresse",
    label: "Résistance sécheresse (mini)",
    section: "Climat",
    type: "relative",
    order: { medium: 2, good: 3, excellent: 4 },
    options: ["all", "medium", "good", "excellent"],
    optionLabels: {
      all: "Tous",
      medium: "Moyenne",
      good: "Bonne",
      excellent: "Excellente",
    },
  },
  {
    key: "resistance_vent",
    label: "Exposition vent",
    section: "Climat",
    type: "relative",
    order: { Faible: 3, Moyenne: 4, Forte: 5, "3": 3, "4": 4, "5": 5 },
    options: ["Faible", "Moyenne", "Forte"],
    optionLabels: {
      Faible: "Faible",
      Moyenne: "Moyenne",
      Forte: "Forte",
    },
  },
  {
    key: "resistance_chaleur_urbaine",
    label: "Chaleur urbaine",
    section: "Climat",
    type: "relative",
    order: { Non: 0, Faible: 3, Moyenne: 4, Forte: 5, "3": 3, "4": 4, "5": 5 },
    options: ["all", "Non", "Faible", "Moyenne", "Forte"],
    optionLabels: {
      all: "Tous",
      Non: "Non",
      Faible: "Faible",
      Moyenne: "Moyenne",
      Forte: "Forte",
    },
  },
  {
    key: "rusticite_min_C",
    label: "Rusticité minimale (°C)",
    section: "Climat",
    type: "numeric",
  },

  // Demandes particulières
  {
    key: "mellifere",
    label: "Mellifère",
    section: "Demandes particulières",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Pas spécialement",
      oui: "Oui",
    },
  },
  {
    key: "ombrage_fort",
    label: "Ombrage",
    section: "Demandes particulières",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Pas spécialement",
      oui: "Oui",
    },
  },
  {
    key: "rafraichissement_fort",
    label: "Rafraîchissement minimal",
    section: "Demandes particulières",
    type: "relative",
    order: { medium: 2, strong: 3 },
    options: ["all", "medium", "strong"],
    optionLabels: {
      all: "Pas spécialement",
      medium: "Moyenne",
      strong: "Fort",
    },
  },
  {
    key: "fruitiere_sauvage",
    label: "Fruits pour la faune",
    section: "Demandes particulières",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Pas spécialement",
      oui: "Oui",
    },
  },

  // Esthétique
  {
    key: "floraison_remarquable",
    label: "Floraison remarquable",
    section: "Esthétique",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Tous",
      oui: "Oui",
    },
  },
  {
    key: "couleur_automnale",
    label: "Couleur automnale",
    section: "Esthétique",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Tous",
      oui: "Oui",
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
      all: "Peu importe",
      low: "Faiblement",
      medium: "Moyennement",
    },
  },
  {
    key: "fruits_salissants",
    label: "Fruits salissants",
    section: "Contraintes du projet",
    type: "exact",
    options: ["all", "non"],
    optionLabels: {
      all: "Peu importe",
      non: "Non",
    },
  },
  {
    key: "branches_fragiles",
    label: "Branches fragiles",
    section: "Contraintes du projet",
    type: "exact",
    options: ["all", "non"],
    optionLabels: {
      all: "Peu importe",
      non: "Non",
    },
  },
  {
    key: "racines_devastatrices",
    label: "Racines problématiques",
    section: "Contraintes du projet",
    type: "exact",
    options: ["all", "non"],
    optionLabels: {
      all: "Peu importe",
      non: "Non",
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
      all: "Peu importe",
      low: "Faible",
      medium: "Moyenne",
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
      all: "Peu importe",
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
      all: "Peu importe",
      low: "Faiblement",
      medium: "Moyennement",
    },
  },
];

export function isFilterActive(config: FilterConfig, value: string): boolean {
  if (!value) return false;
  if (config.type === "multi" && config.options) {
    const allNonAll = config.options.filter((o) => o !== "all");
    const selected = value.split(",").filter(Boolean);
    if (selected.length === allNonAll.length) return false;
  }
  return true;
}

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
    // Pour les filtres multi, tout cocher par défaut (sauf "all")
    if (f.type === "multi" && f.options) {
      state[f.key] = f.options.filter((o) => o !== "all").join(",");
    } else if (f.key === "resistance_vent") {
      state[f.key] = "Faible";
    } else {
      state[f.key] = "";
    }
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
