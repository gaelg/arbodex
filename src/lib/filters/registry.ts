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
    type: "multi",
    options: ["profond"],
    optionLabels: {
      profond: "Sol profond",
    },
  },

  // Climat
  {
    key: "resistance_vent",
    label: "Exposition vent",
    section: "Climat",
    type: "slider",
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
    type: "slider",
    order: {
      Non: 0,
      Faible: 3,
      Moyenne: 4,
      Forte: 5,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
    },
    options: ["Non", "Faible", "Moyenne", "Forte"],
    optionLabels: {
      Non: "Non",
      Faible: "Faible",
      Moyenne: "Moyenne",
      Forte: "Forte",
    },
  },
  {
    key: "rusticite_min_C",
    label: "Grands froids",
    section: "Climat",
    type: "slider",
    order: {
      "-12": -12,
      "-15": -15,
      "-20": -20,
      "-25": -25,
      "-30": -30,
      "-35": -35,
      "-40": -40,
    },
    options: ["-12", "-15", "-20", "-25", "-30", "-35", "-40"],
    optionLabels: {
      "-12": "-12 °C",
      "-15": "-15 °C",
      "-20": "-20 °C",
      "-25": "-25 °C",
      "-30": "-30 °C",
      "-35": "-35 °C",
      "-40": "-40 °C",
    },
  },

  // Contraintes du projet
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

  // Demandes particulières
  {
    key: "origine",
    label: "Aire d'origine",
    section: "Demandes particulières",
    type: "exact",
    options: [
      "all",
      "Indigène",
      "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux",
      "Vraiment exotique",
    ],
    optionLabels: {
      all: "Peu importe",
      Indigène: "Local (HDF/BeNeLux)",
      "Indigène en Europe de l'Ouest mais pas en HDF/BeNeLux": "Presque local",
      "Vraiment exotique": "Vraiment exotique",
    },
  },
  {
    key: "adapte_changement_climatique",
    label: "Adapté changement climatique",
    section: "Demandes particulières",
    type: "exact",
    options: ["all", "oui"],
    optionLabels: {
      all: "Pas spécialement",
      oui: "Oui",
    },
  },
  {
    key: "pollen_allergisant",
    label: "Allergisant (maxi)",
    section: "Demandes particulières",
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
  {
    key: "cout_entretien",
    label: "Coût entretien (maxi)",
    section: "Demandes particulières",
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
    section: "Demandes particulières",
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
    section: "Demandes particulières",
    type: "relative",
    order: { low: 1, medium: 2 },
    options: ["all", "low", "medium"],
    optionLabels: {
      all: "Peu importe",
      low: "Faiblement",
      medium: "Moyennement",
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
];

export function isFilterActive(config: FilterConfig, value: string): boolean {
  if (!value) return false;
  if (config.key === "sol_depth") return value !== "profond";
  if (config.type === "multi" && config.options) {
    const allNonAll = config.options.filter((o) => o !== "all");
    const selected = value.split(",").filter(Boolean);
    if (selected.length === allNonAll.length) return false;
  }
  if (config.type === "slider" && config.options && value === config.options[0]) return false;
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
    } else if (f.type === "slider") {
      state[f.key] = "";
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
